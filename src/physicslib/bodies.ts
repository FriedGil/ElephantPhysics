import type { Shape } from "./shapes";
import { Vector } from "./vector";

export class DynamicBody {
    pos: Vector;
    vel: Vector;
    acc: Vector;
    mass: number;
    shape: Shape;
    forces: Vector[];
    constructor(pos: Vector, vel: Vector, acc: Vector, mass: number, shape: Shape){
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.shape = shape;
        this.forces = []; 
    }
    update(t: number){ 
        //t is milliseconds 
        // this.acc = this.netForce().div(this.mass);
        this.vel = this.vel.add(this.acc.mult(t/1000));
        this.pos = this.pos.add(this.vel.mult(t/1000));
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.stroke(this.shape.getPath(this.pos.x, this.pos.y));
    }

    netForce(){
        let sum: Vector = new Vector(0,0);
        for (let i = 0; i < this.forces.length; i++){
            sum = sum.add(this.forces[i]);
        }
        return sum;
    }
}

export class StaticBody {
    
}