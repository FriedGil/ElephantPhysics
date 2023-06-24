import { Vector } from "./Vector";
import { approxcolHybrid, resolvecol } from "./collisions";
export class Particle {
    static particlesCount = 0;
    p: Vector;
    v: Vector;
    a: Vector;
    m: number;
    r: number;
    id: string;
    constructor(p: Vector, v: Vector, a: Vector, m: number, r: number, id: string = "Particle" + ++Particle.particlesCount) {
        this.p = p;
        this.v = v;
        this.a = a;
        this.m = m;
        this.r = r;
        this.id = id;

    }
    getStateNoColl(t: number){
        let vx, vy, px, py;
        vx = this.v.x + this.a.x * t;
        vy = this.v.y + this.a.y * t;
        px = this.p.x + (this.v.x * t) + (.5 * this.a.x * t * t);
        py = this.p.y + (this.v.y * t) + (.5 * this.a.y * t * t);
        return new Particle(new Vector(px,py), new Vector(vx,vy),this.a.copy(),this.m,this.r, this.id);
    }
}

