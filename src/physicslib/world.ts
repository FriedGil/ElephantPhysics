import type { NoImage } from "carbon-icons-svelte";
import { type StaticBody,  DynamicBody } from "./bodies";
import { collision } from "./collisions";
import { Vector } from "./vector";
import { Circle } from "./shapes";
export class World {
    staticBodies: StaticBody[];
    dynamicBodies: DynamicBody[];
    width: number;
    height: number;
    forces: Vector[];
    speed: number;
    time: number;
    constructor(statics: StaticBody[] = [], dynamics: DynamicBody[] = [], width: number = 500, height: number = 500, forces: Vector[] = []){
        this.staticBodies = statics;
        this.dynamicBodies = dynamics;
        this.width = width;
        this.height = height;
        this.forces = forces;
        this.speed = 1;
        this.time = 0;
    }
    update(t: number, ctx: CanvasRenderingContext2D){
        // this.staticBodies.forEach((b)=>{
        //     b.draw();
        // });
        collision(this);
        this.dynamicBodies.forEach((b)=>{
            b.draw(ctx);
            b.update(t*this.speed);
            
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

export function jsontoworld(input: any): World{
    let world = new World();
    input.dynamicBodies.forEach((body: any)=>{
        world.dynamicBodies.push(new DynamicBody(new Vector(body.x,body.y), new Vector(body.vx,body.vy),new Vector(body.ax, body.ay),body.mass,new Circle(body.radius)));
    });
    return world;
}

export function worldtojson(world: World){
    let result: any = {"dynamicBodies":[]};
    world.dynamicBodies.forEach((body)=>{
        result.dynamicBodies.push({"x":body.pos.x,"y":body.pos.y,"vx":body.vel.x,"vy":body.vel.y,"ax":body.acc.x,"ay":body.acc.y,"mass":body.mass,"radius":body.shape.radius});
    })
    return result;
}