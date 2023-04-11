import type { StaticBody,  DynamicBody } from "./bodies";
import { collision } from "./collisions";
import { Vector } from "./vector";

export class World {
    staticBodies: StaticBody[];
    dynamicBodies: DynamicBody[];
    width: number;
    height: number;
    forces: Vector[];
    constructor(statics: StaticBody[] = [], dynamics: DynamicBody[] = [], width: number = 500, height: number = 500, forces: Vector[] = []){
        this.staticBodies = statics;
        this.dynamicBodies = dynamics;
        this.width = width;
        this.height = height;
        this.forces = forces;
    }
    update(t: number, ctx: CanvasRenderingContext2D){
        // this.staticBodies.forEach((b)=>{
        //     b.draw();
        // });
        collision(this);
        this.dynamicBodies.forEach((b)=>{
            b.draw(ctx);
            b.update(t);
            
        });

    }
    draw(ctx: CanvasRenderingContext2D){
        this.dynamicBodies.forEach((b)=>{
            b.draw(ctx);            
        });
    }

    netForce(){
        let sum: Vector = new Vector(0,0);
        for (let i = 0; i < this.forces.length; i++){
            sum = sum.add(this.forces[i]);
        }
        return sum;
    }


}