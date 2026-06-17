export class ParticleText {
  constructor(canvas, text, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.text = text;
    this.options = options;
    this.particles = [];
    this.mouse = { x: -9999, y: -9999, radius: options.mouseRadius || 120 };
    this.animationId = null;
    this.running = false;
    this.resizeTimer = null;
    this.init();
  }

  init() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = width < 768;
    const lenFactor = Math.max(0.55, 7 / Math.max(this.text.replace(/\s/g, "").length, 1));

    let fontSize = small
      ? Math.min(Math.max(width * 0.14 * lenFactor, 38), 80)
      : Math.min(width * 0.14 * lenFactor, 190);

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `300 ${fontSize}px Inter, sans-serif`;
    const textWidth = tempCtx.measureText(this.text).width;

    const maxTextWidth = width * 0.85;
    if (textWidth > maxTextWidth) {
      fontSize = fontSize * (maxTextWidth / textWidth);
    }
    this.fontSize = fontSize;

    this.particleSize = this.options.particleSize || 1.5;
    this.particleGap = small ? 2 : (this.options.particleGap || 3);
    this.spring = this.options.spring || 0.06;
    this.friction = this.options.friction || 0.88;
    this.repelForce = this.options.repelForce || 10;
    this.color = this.options.color || "#ffffff";
    this.mouse.radius = small ? 50 : (this.options.mouseRadius || 120);

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    octx.fillStyle = "#ffffff";
    octx.font = `300 ${this.fontSize}px Inter, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(this.text, width / 2, height / 2);

    const imageData = octx.getImageData(0, 0, width, height);
    this.particles = [];
    for (let y = 0; y < height; y += this.particleGap) {
      for (let x = 0; x < width; x += this.particleGap) {
        const index = (y * width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          this.particles.push({
            originX: x,
            originY: y,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            size: this.particleSize,
          });
        }
      }
    }
  }

  update() {
    this.particles.forEach((p) => {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * this.repelForce;
        p.vy -= Math.sin(angle) * force * this.repelForce;
      }

      p.vx += (p.originX - p.x) * this.spring;
      p.vy += (p.originY - p.y) * this.spring;
      p.vx *= this.friction;
      p.vy *= this.friction;
      p.x += p.vx;
      p.y += p.vy;
    });
  }

  draw() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = this.color;
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate = () => {
    if (!this.running) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.animate();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }

  setMouse(x, y) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  clearMouse() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.stop();
      this.init();
      this.start();
    }, 100);
  }

  destroy() {
    clearTimeout(this.resizeTimer);
    this.stop();
  }
}