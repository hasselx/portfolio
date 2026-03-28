import { useEffect, useRef } from "react";

const random = (min, max) => Math.random() * (max - min) + min;

function generateStars({ count, minSize, maxSize, minOpacity, maxOpacity, minSpeed, maxSpeed, dotColor }) {
  const [r, g, b] = dotColor;
  return Array.from({ length: count }, (_, i) => ({
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
    r, g, b,
  }));
}

export default function StarryDots({
  // Dot count (reduced by half)
  count = 40,

  // Size range (px)
  minSize = 1,
  maxSize = 2.2,

  // Opacity range (0–1)
  minOpacity = 0.28,
  maxOpacity = 0.5,

  // Speed range
  minSpeed = 0.8,
  maxSpeed = 1.8,

  // Colors
  backgroundColor = "#0f172a",
  dotColor = [6, 181, 216], // #06b5d8 as [R, G, B]
}) {
  const canvasRef = useRef(null);
  
  // Initialize stars once
  const starsRef = useRef(
    generateStars({ count, minSize, maxSize, minOpacity, maxOpacity, minSpeed, maxSpeed, dotColor })
  );
  
  const animRef = useRef(null);
  const timeRef = useRef(0);

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

      const activeCount = window.innerWidth < 768 ? Math.floor(count / 2) : count;

      for (let i = 0; i < activeCount; i++) {
        const star = starsRef.current[i];
        star.x += star.dx * star.speed;
        star.y += star.dy * star.speed;

        if (star.x < -1) star.x = 101;
        if (star.x > 101) star.x = -1;
        if (star.y < -1) star.y = 101;
        if (star.y > 101) star.y = -1;

        const twinkle =
          Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
        const alpha = star.opacity * twinkle;

        const px = (star.x / 100) * w;
        const py = (star.y / 100) * h;
        const { r, g, b, size: radius } = star;

        // core dot ONLY (glow removed)
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", background: backgroundColor, position: "relative", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
