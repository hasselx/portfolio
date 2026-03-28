import { useEffect, useRef } from "react";

const random = (min, max) => Math.random() * (max - min) + min;

export default function StarryDots({ 
  count = 80,
  minSize = 1,
  maxSize = 2.2,
  minOpacity = 0.28,
  maxOpacity = 0.5,
  minSpeed = 0.8,
  maxSpeed = 1.3,
  backgroundColor = "#0f172a",
  dotColor = [6, 181, 216]
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  // Generate stars inside the component using the props
  const starsRef = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random(0, 100),
      y: random(0, 100),
      size: random(minSize, maxSize),
      opacity: random(minOpacity, maxOpacity),
      speed: random(minSpeed, maxSpeed),
      dx: random(-0.04, 0.04),
      dy: random(-0.02, 0.02),
      twinkleOffset: random(0, Math.PI * 2),
      twinkleSpeed: random(0.3, 1.0),
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      timeRef.current = ts * 0.001;

      ctx.clearRect(0, 0, w, h);

      const activeCount = window.innerWidth < 768 ? Math.floor(count / 2.5) : count;
      
      for (let i = 0; i < activeCount; i++) {
        const star = starsRef.current[i];
        // move
        star.x += star.dx * star.speed;
        star.y += star.dy * star.speed;

        // wrap edges
        if (star.x < -1) star.x = 101;
        if (star.x > 101) star.x = -1;
        if (star.y < -1) star.y = 101;
        if (star.y > 101) star.y = -1;

        // twinkle
        const twinkle =
          Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) *
            0.35 +
          0.65;
        const alpha = star.opacity * twinkle;

        const px = (star.x / 100) * w;
        const py = (star.y / 100) * h;
        const r = star.size;

        // soft glow for visibility
        const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 3.5);
        grd.addColorStop(0, `rgba(${dotColor[0]}, ${dotColor[1]}, ${dotColor[2]}, ${alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${dotColor[0]}, ${dotColor[1]}, ${dotColor[2]}, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor[0]}, ${dotColor[1]}, ${dotColor[2]}, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [dotColor]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: backgroundColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
