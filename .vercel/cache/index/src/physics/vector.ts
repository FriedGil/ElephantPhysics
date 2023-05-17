export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
  }
  sub(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;
  }
  mult(s: number) {
    this.x *= s;
    this.y *= s;
  }
  div(s: number) {
    this.x /= s;
    this.y /= s;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  norm() {
    const m = this.mag();
    this.x /= m;
    this.y /= m;
  }
  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }
  static add(v1: Vector, v2: Vector){
    return new Vector(v1.x+v2.x,v1.y+v2.y);
  }
  static sub(v1: Vector, v2: Vector){
    return new Vector(v1.x-v2.x,v1.y-v2.y);
  }
  static mult(v1: Vector, s: number){
    return new Vector(v1.x * s, v1.y *s);
  }
  static div(v1: Vector, s: number){
    return new Vector(v1.x / s, v1.y /s);
  }

  static norm(v1: Vector){
    const m = v1.mag();
    return new Vector(v1.x/m,v1.y/m);
  }

}
