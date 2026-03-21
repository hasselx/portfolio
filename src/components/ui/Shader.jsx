import React, { useRef, useEffect } from "react";

const VERT = `
attribute vec2 a_pos;
void main(){gl_Position=vec4(a_pos,0.0,1.0);}
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

float noise(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(
    mix(hash(i),hash(i+vec2(1,0)),u.x),
    mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),
    u.y
  );
}

float fbm(vec2 p){
  float v=0.0,a=0.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  uv.y=1.0-uv.y;

  /* smooth mouse */
  vec2 m=u_mouse;

  /* diagonal axis — 135 deg top-left to bottom-right */
  float diag=dot(uv-0.5,normalize(vec2(1.0,-1.0)));
  float perp=dot(uv-0.5,normalize(vec2(1.0, 1.0)));

  /* animated scroll offset — rays drift diagonally */
  float t=u_time*0.18;
  float shift=diag+t;

  /* mouse offsets the ray band center */
  float mInfluence=(m.x-0.5)*0.35+(m.y-0.5)*0.18;

  /* --- base background gradient: deep navy → teal --- */
  vec3 colA=vec3(0.04,0.07,0.15);   /* deep navy */
  vec3 colB=vec3(0.02,0.28,0.38);   /* teal */
  vec3 colC=vec3(0.04,0.45,0.55);   /* bright teal accent */
  float bgT=clamp(uv.x*0.5+uv.y*0.35,0.0,1.0);
  vec3 bg=mix(colA,colB,smoothstep(0.0,1.0,bgT));

  /* --- light ray bands --- */
  float rays=0.0;
  /* 4 overlapping ray sets at slightly different frequencies/speeds */
  for(int k=0;k<4;k++){
    float fk=float(k);
    float freq=4.0+fk*2.8;
    float spd =0.09+fk*0.04;
    float phase=fk*1.57;
    float s=shift*freq+phase+mInfluence*freq;
    float band=sin(s)*0.5+0.5;
    band=pow(band,6.0);                 /* sharp bright streaks */
    float w=0.5+0.5*sin(u_time*0.3+fk*2.1); /* breathing width */
    band*=w;
    rays+=band*(0.28-fk*0.04);
  }

  /* soft fbm warp — gives rays a slight organic waver */
  float warp=fbm(vec2(perp*2.0+u_time*0.12, shift*1.5))*0.12;
  rays*=(1.0+warp);

  /* radial vignette — fade toward edges */
  float vig=1.0-length(uv-vec2(0.5,0.5))*1.1;
  vig=clamp(vig,0.0,1.0);
  vig=pow(vig,0.6);

  /* mouse hotspot glow */
  float mdist=length(uv-m);
  float glow=exp(-mdist*mdist*6.0)*0.18;
  vec3 glowCol=colC;

  /* compose */
  vec3 rayCol=mix(colB,colC,clamp(rays*1.4,0.0,1.0));
  vec3 color=bg+rayCol*rays*vig*1.6+glowCol*glow;

  /* subtle scanline grain for texture */
  float grain=hash(uv*u_res*0.5+u_time*100.0)*0.025-0.012;
  color+=grain;

  gl_FragColor=vec4(clamp(color,0.0,1.0),1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export default function PortfolioShader({ style, children }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ mouse: { x: 0.5, y: 0.5 }, target: { x: 0.5, y: 0.5 } });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime  = gl.getUniformLocation(prog, "u_time");

    const start = performance.now();
    let raf;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const tick = () => {
      const s = stateRef.current;
      s.mouse.x += (s.target.x - s.mouse.x) * 0.05;
      s.mouse.y += (s.target.y - s.mouse.y) * 0.05;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, s.mouse.x, s.mouse.y);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  const onMouseMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    stateRef.current.target = {
      x: (e.clientX - r.left) / r.width,
      y: 1 - (e.clientY - r.top) / r.height,
    };
  };
  const onMouseLeave = () => {
    stateRef.current.target = { x: 0.5, y: 0.5 };
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit" }}
      />
      {children && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {children}
        </div>
      )}
    </div>
  );
}
