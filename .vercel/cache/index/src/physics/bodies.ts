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
    this.forces.push(this.acc.div(this.mass));
  }
  update(t: number) {
    //t is milliseconds
    // this.acc = this.netForce().div(this.mass);
    this.vel = this.vel.add(this.acc.mult(t / 1000));
    this.pos = this.pos.add(this.vel.mult(t / 1000));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.stroke(this.shape.getPath(this.pos.x, this.pos.y));
    this.vel.drawVec(this.pos.x,this.pos.y,1,"green",ctx);

  }

  netForce() {
    let sum: Vector = new Vector(0, 0);
    for (let i = 0; i < this.forces.length; i++) {
      sum = sum.add(this.forces[i]);
    }
    return sum;
  }
}

export class StaticBody {}

export class BodySystem {
  bodies: DynamicBody[];
  orientation: orient;
  constructor(bodies: DynamicBody[] = [], orientation: orient = "horizontal"){
    this.bodies = bodies;
    this.orientation = orientation;
  }
  getCenterOfMass(){
    let xcm = 0;
    let ycm = 0;
    let m = 0;
    for(let i = 0; i < this.bodies.length; i++){
      xcm += this.bodies[i].pos.x * this.bodies[i].mass;
      ycm += this.bodies[i].pos.y * this.bodies[i].mass;
      m += this.bodies[i].mass;
    }
    return new Vector(xcm/m,ycm/m);
  }
  orient(){
    for(let i = 0; i < this.bodies.length; i++){
      this.bodies[i].pos = this.bodies[i].pos.sub(this.getCenterOfMass());
    }
  }
  drawCenterOfMass(ctx:CanvasRenderingContext2D){
    let com = this.getCenterOfMass();
    ctx.fillText("CoM", com.x, com.y);
  }
}

type orient = "vertical" | "horizontal";