import type { BodySystem } from "./bodies";
import { collision } from "./collisions";
import type { Vector } from "./vector";
import { Circle, Elephant } from "./shapes";

export class Spring {
    
}

export class Pendulum {
    length: number;
    origin: Vector;
    end: BodySystem;
    constructor(length: number, origin: Vector, end: BodySystem){
        this.length = length;
        this.origin = origin;
        this.end = end;
    }
    draw(ctx: CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.moveTo(this.origin.x,this.origin.y);
        ctx.lineTo(this.end.getCenterOfMass().x,this.end.getCenterOfMass().y);
        ctx.stroke();
    }
    update(){
   }


}

export class Joint {

}

