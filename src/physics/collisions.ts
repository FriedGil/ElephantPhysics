import { Vector } from "./Vector";
import { Particle } from "./Particle";

export function approxcol(p1: Particle, p2: Particle, timeStep = 0.01, maxIterations = 10000, initialTime=0): number{
    let t = 0;
    let p1pos = p1.p.copy();
    let p2pos = p2.p.copy();
    let p1vel: Vector = p1.v.copy();
    let p2vel = p2.v.copy();
    let p1acc = p1.a.copy();
    let p2acc = p2.a.copy();
    p1vel.add(Vector.multiply(p1acc,initialTime));
    p2vel.add(Vector.multiply(p1acc,initialTime));
    p1pos.add(Vector.multiply(p1vel,initialTime));
    p2pos.add(Vector.multiply(p2vel,initialTime));

  for (let i = 0; i < maxIterations; i++) {
    const v1 = Vector.add(p1vel, Vector.multiply(p1acc,t));
    const v2 = Vector.add(p2vel, Vector.multiply(p2acc,t));
    p1pos.add(Vector.multiply(v1,timeStep));
    p2pos.add(Vector.multiply(v2,timeStep));
    if (Vector.distance(p1pos,p2pos) <= p1.r + p2.r){
        return t;
    }
    t += timeStep;
  }
  return Number.POSITIVE_INFINITY;
}


export function approxcolHybrid(p1: Particle, p2: Particle){
    let xtimebound1 = ( Math.sqrt( Math.pow(( p1.v.x-p2.v.x - (p1.r + p2.r)),2) - 4 * (p1.p.x-p2.p.x)*(0.5*p1.a.x-0.5*p2.a.x)) - p1.v.x + p2.v.x ) / (p1.a.x-p2.a.x);
    let xtimebound2 = ( Math.sqrt( Math.pow(( p1.v.x-p2.v.x),2) - 4 * (p1.p.x-p2.p.x)*(0.5*p1.a.x-0.5*p2.a.x)) - p1.v.x + p2.v.x ) / (p1.a.x-p2.a.x);
    let min = Math.min(xtimebound1,xtimebound2);
    let max = Math.max(xtimebound1,xtimebound2);
    return approxcol(p1,p2,0.01,Math.min((max-min)/0.001,10_000),min);
    

}

export function isColl(p1: Particle, p2: Particle){
    return (Vector.distance(p1.p,p2.p) > p1.r + p2.r) ;
}

export function resolvecol(p1: Particle, p2: Particle): [Particle,Particle]{
    if (Vector.distance(p1.p,p2.p) > p1.r + p2.r){
        console.log("shouldn't be here");
    };

    const d: number =  Vector.subtract(p1.p,p2.p).magnitude();
    const overlap: number = p1.r + p2.r - d;
    const n: Vector = Vector.normalize(Vector.subtract(p1.p,p2.p));

    //alternate resolution
    
    const p1vx = ((p1.m-p2.m)*p1.v.x + 2*p2.m*p2.v.x)/(p1.m+p2.m);
    const p1vy = ((p1.m-p2.m)*p1.v.y + 2*p2.m*p2.v.y)/(p1.m+p2.m);
    const p2vx = ((p2.m-p1.m)*p2.v.x + 2*p1.m*p1.v.x)/(p2.m+p1.m);
    const p2vy = ((p2.m-p1.m)*p2.v.y + 2*p1.m*p1.v.y)/(p2.m+p1.m);

    const p1new = new Particle(p1.p, new Vector(p1vx,p1vy),p1.a.copy(),p1.m,p1.r, p1.id);
    const p2new = new Particle(p2.p, new Vector(p2vx,p2vy),p2.a.copy(),p2.m,p2.r, p2.id);

    // const v1n: number = Vector.dot(p1.v,n);
    // const v2n: number = Vector.dot(p2.v,n);

    // const v1t: Vector = Vector.subtract(p1.v,(Vector.multiply(n,v1n)));
    // const v2t: Vector = Vector.subtract(p2.v,(Vector.multiply(n,v2n)));
    // const v1nNew =
    //   (v1n * (p1.m - p2.m) + 2 * p2.m * v2n) /
    //   (p1.m + p2.m);
    // const v2nNew =
    //   (v2n * (p2.m - p1.m) + 2 * p1.m * v1n) /
    //   (p1.m + p2.m);

    // const p1new = new Particle(p1.p, Vector.add(v1t,(Vector.multiply(n,v1nNew))),p1.a.copy(),p1.m,p1.r);
    // const p2new = new Particle(p2.p, Vector.add(v2t,(Vector.multiply(n,v2nNew))),p2.a.copy(),p2.m,p2.r);
    // const p1new = new Particle(Vector.add(p1.p, Vector.multiply(n,overlap / 2)), Vector.add(v1t,(Vector.multiply(n,v1nNew))),p1.a.copy(),p1.m,p1.r);
    // const p2new = new Particle(Vector.subtract(p2.p, Vector.multiply(n,overlap / 2)), Vector.add(v2t,(Vector.multiply(n,v2nNew))),p2.a.copy(),p2.m,p2.r);

    return [p1new,p2new];
}

export function getNextColl(particles: Particle[]): [number, number[]] {
    let mintime = Number.POSITIVE_INFINITY;
    let minids = [-1, -1];
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (j != i && !(minids[0] == j && minids[1] == i)) {
                let temp = approxcolHybrid(particles[i], particles[j]);
                if (temp < mintime) {
                    mintime = temp;
                    minids = [i, j];
                }
            }
        }
    }
    return [mintime, minids];
}

export function getNextCollTime(particles: Particle[]): number {
    let mintime = Number.POSITIVE_INFINITY;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
                let temp = approxcolHybrid(particles[i], particles[j]);
                if (temp < mintime) {
                    mintime = temp;
                }
        }
    }
    return mintime;
}

export function worldcolres(particles: Particle[]){
    const tempParticles =  particles.map((b) => b);
    for (let i = 0; i < tempParticles.length; i++) {
        for (let j = i + 1; j < tempParticles.length; j++) {
            if (Vector.distance(tempParticles[i].p,tempParticles[j].p) <= tempParticles[i].r + tempParticles[j].r){
               let p1 = tempParticles[i];
               let p2 = tempParticles[j];
               const p1vx = ((p1.m-p2.m)*p1.v.x + 2*p2.m*p2.v.x)/(p1.m+p2.m);
               const p1vy = ((p1.m-p2.m)*p1.v.y + 2*p2.m*p2.v.y)/(p1.m+p2.m);
               const p2vx = ((p2.m-p1.m)*p2.v.x + 2*p1.m*p1.v.x)/(p2.m+p1.m);
               const p2vy = ((p2.m-p1.m)*p2.v.y + 2*p1.m*p1.v.y)/(p2.m+p1.m);
                p1.v = new Vector(p1vx,p1vy);
                p2.v = new Vector(p2vx,p2vy);
            }   
        }
    }
    return tempParticles;
}
function roundToNearestTenth(num: number): number {
  return Math.round(num * 10) / 10;
}