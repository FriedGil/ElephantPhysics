export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  sub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  mult(s: number) {
    return new Vector(this.x * s, this.y * s);
  }
  div(s: number) {
    return new Vector(this.x / s, this.y / s);
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  norm() {
    const m = this.mag();
    return new Vector(this.x / m, this.y / m);
  }
  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }
}
