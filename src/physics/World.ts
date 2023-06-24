import { Particle } from "./Particle";
import { Vector } from "./Vector";
import { approxcolHybrid, getNextColl, getNextCollTime, resolvecol, worldcolres } from "./collisions";
import {roundToNearestThousandth} from "./util";

export class World {
    config = {};
    particles: Particle[];
    state: StateNode;
    constructor(particles: Particle[]) {
        this.particles = particles;
        this.state = this.stateConstructor(1000);
    }
    getState(t: number): Particle[] {
        return this.state.evaluate(t);
    }
    stateConstructor(maxTime: number = 200): StateNode {
        let s = new StateNode(getNextCollTime(this.particles), getStateFunc(this.particles));
        const tree = s;
        let loops = 0;
        let sumtime = 0;
        while (loops++ < 1000) {
        let nextcoll = getNextCollTime(this.particles);
        sumtime += nextcoll;
          if (sumtime > maxTime) {
            s.right = new StateNode(maxTime, getStateFunc(s.collstate), null);
            break;
          }
          s.right = new StateNode(nextcoll, getStateFunc(s.collstate), null);
          s = s.right;

        }
      
        return tree;
      }
      
    
}


function getStateFunc(particles: Particle[]) : (t: number) => Particle[] {
    return (t: number) => (particles.map((b: Particle) => b.getStateNoColl(t)));
}


class StateNode {
    upperBound: number;
    equation: (x: number) => Particle[];
    right: StateNode | null;
    collstate: Particle[];
    constructor(upperBound: number,equation: (x: number) => Particle[], right: StateNode | null = null){
        this.upperBound = upperBound;
        this.equation = equation;
        this.right = right;
        this.collstate = worldcolres(this.equation(roundToNearestThousandth(this.upperBound))); 
    }
    evaluate(t: number): Particle[]{

        if (t > this.upperBound){
            if (this.right !== null) return this.right?.evaluate(t-this.upperBound);
            else {
                throw new Error("t above highest bound");
            }
        }
        return this.equation(t);
    }
}


type ParticleType = {
    id: string,
    x: number,
    y: number,
    vx: number,
    vy: number,
    ax: number,
    ay: number,
    m: number,
    r: number
}

export function w2json(world: World){
    let result: any = { particles: [] as ParticleType[]};
    world.particles.forEach((p)=>{
        result.particles.push({
            id: p.id,
            x: p.p.x,
            y: p.p.y,
            vx: p.v.x,
            vy: p.v.y,
            ax: p.a.x,
            ay: p.a.y,
            m: p.m,
            r: p.r
        });
    })
    return result;
}

export function json2w(conf: any): World{
    let particles: Particle[] = [];
    conf.particles.forEach((p: any)=>{
        particles.push(new Particle(
            new Vector(p.x, p.y),
            new Vector(p.vx, p.vy),
            new Vector(p.ax, p.ay),
            p.m,
            p.r,
            p.id,
        ))
    });
    return new World(particles);

}