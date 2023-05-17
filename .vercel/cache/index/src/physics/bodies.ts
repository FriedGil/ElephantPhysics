import type { Shape } from "./shapes";
import { Vector } from "./vector";

export class DynamicBody {
  id: String;
  pos: Vector;
  vel: Vector;
  acc: Vector;
  mass: number;
  shape: Shape;
  forces: Vector[];
  constructor(
    pos: Vector,
    vel: Vector,
    acc: Vector,
    mass: number,
    shape: Shape,
    id: string = "Unnamed"
  ) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.mass = mass;
    this.shape = shape;
    this.forces = [];
  }
  update(t: number) {
    //t is milliseconds
    // this.acc = this.netForce().div(this.mass);
    this.vel.add(Vector.div(this.acc, 1000/t));
    this.pos.add(Vector.div(this.vel, 1000/t));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.stroke(this.shape.getPath(this.pos.x, this.pos.y));
  }

  netForce() {
    let sum: Vector = new Vector(0, 0);
    for (let i = 0; i < this.forces.length; i++) {
      sum.add(this.forces[i]);
    }
    return sum;
  }
}


