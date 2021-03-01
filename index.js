const canvas = document.getElementById('avatar-canvas');
const holder = document.getElementById('avatar-holder');

class Maker {
  color = { r: 0, g: 0, b: 0 };
  colorV = { r: 1, g: 1, b: 1 };

  last = 0;
  gap = 1 * (1000 / 60); // to change fps

  // size * (base = 64)
  constructor(cvs, size = 5) {
    this.cvs = cvs;
    this.size = size;
    this.ctx = this.cvs.getContext('2d');
    if (this.ctx === null) {
      return;
    }
  }

  random255() {
    return Math.floor(Math.random() * 256);
  }

  startDraw() {
    this.color.r = this.random255();
    this.color.g = this.random255();
    this.color.b = this.random255();
    requestAnimationFrame(this.repeat.bind(this));
  }

  staticAvatar(color) {
    this.color.r = color.r;
    this.color.g = color.g;
    this.color.b = color.b;
    this.drawBackground();
    this.drawRobot();
  }

  repeat(now) {
    if (this.last === 0) {
      this.last = now;
      this.drawBackground();
      this.drawRobot();
    }
    const delta = now - this.last;
    if (delta >= this.gap) {
      this.drawBackground();
      this.drawRobot();
      this.updateColor();
      this.last = now - (delta % this.gap);
    }
    requestAnimationFrame(this.repeat.bind(this));
  }

  updateColor() {
    for (const c of Object.keys(this.color)) {
      const hue = this.color[c];
      if (hue + this.colorV[c] < 0 || hue + this.colorV[c] > 255) {
        this.colorV[c] *= -1;
      }
      this.color[c] += this.colorV[c];
    }
  }

  drawBackground() {
    const size = this.size;
    const r = this.color.r;
    const g = this.color.g;
    const b = this.color.b;
    const ctx = this.ctx;

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, 64 * size, 64 * size);
    // #3b84b2
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 34 * size);
    ctx.arcTo(4 * size, 28 * size, 6 * size, 28 * size, 16 * size);

    ctx.lineTo(60 * size, 28 * size);
    ctx.arc(60 * size, 32 * size, 4 * size, -0.5 * Math.PI, 0, false);
    ctx.lineTo(64 * size, 0);
    ctx.closePath();
    ctx.fill();
  }

  drawRobot() {
    const size = this.size;
    const r = this.color.r;
    const g = this.color.g;
    const b = this.color.b;
    const ctx = this.ctx;

    ctx.fillStyle = '#fff';

    ctx.fillRect(14 * size, 0, 36 * size, 36 * size);
    ctx.fillRect(14 * size, 36 * size, 28 * size, 16 * size);
    // legs
    ctx.fillRect(18 * size, 52 * size, 4 * size, 4 * size);
    ctx.fillRect(34 * size, 52 * size, 4 * size, 4 * size);
    // head and body
    ctx.fillStyle = '#000';
    ctx.fillRect(18 * size, 4 * size, 28 * size, 28 * size);
    ctx.fillRect(18 * size, 36 * size, 20 * size, 12 * size);
    // eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(22 * size, 20 * size, 8 * size, 8 * size);
    ctx.fillRect(34 * size, 20 * size, 8 * size, 8 * size);
    // shoes
    ctx.fillStyle = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    ctx.beginPath();
    ctx.moveTo(17 * size, 56 * size);
    ctx.lineTo(23 * size, 56 * size);
    ctx.lineTo(22 * size, 60 * size);
    ctx.lineTo(26 * size, 60 * size);
    ctx.lineTo(26 * size, 64 * size);
    ctx.lineTo(18 * size, 64 * size);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(33 * size, 56 * size);
    ctx.lineTo(39 * size, 56 * size);
    ctx.lineTo(38 * size, 60 * size);
    ctx.lineTo(42 * size, 60 * size);
    ctx.lineTo(42 * size, 64 * size);
    ctx.lineTo(34 * size, 64 * size);
    ctx.closePath();
    ctx.fill();

    // ctx.fillRect(18 * size, 56 * size, 4 * size, 8 * size);
    // ctx.fillRect(34 * size, 56 * size, 4 * size, 8 * size);
    // ctx.fillRect(22 * size, 60 * size, 4 * size, 4 * size);
    // ctx.fillRect(38 * size, 60 * size, 4 * size, 4 * size);
  }
}

new Maker(canvas).startDraw();

canvas.addEventListener('click', () => {
  holder.src = canvas.toDataURL();
})
