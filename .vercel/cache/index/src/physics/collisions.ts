import type { DynamicBody } from "./bodies";
import { Circle, Elephant } from "./shapes";
import { Vector } from "./vector";
import type { World } from "./world";

export function collision(world: World) {
  for (let i = 0; i < world.dynamicBodies.length; i++) {
    for (let j = 0; j < world.dynamicBodies.length; j++) {
      if (i != j) {
        if (touching(world.dynamicBodies[i], world.dynamicBodies[j])) {
          const b1: DynamicBody = world.dynamicBodies[i];
          const b2: DynamicBody = world.dynamicBodies[j];
          const d: number =  Vector.sub(b1.pos,b2.pos).mag();
          const r1: number = b1.shape.radius;
          const r2: number = b2.shape.radius;
          const overlap: number = r1 + r2 - d;
          const n: Vector = Vector.norm(Vector.sub(b1.pos,b2.pos));
          b1.pos.add(Vector.mult(n,overlap / 2));
          b2.pos.sub(Vector.mult(n,overlap / 2));
          const v1n: number = b1.vel.dot(n);
          const v2n: number = b2.vel.dot(n);
          const v1t: Vector = Vector.sub(b1.vel,(Vector.mult(n,v1n)));
          const v2t: Vector = Vector.sub(b2.vel,(Vector.mult(n,v2n)));
          const v1nNew =
            (v1n * (b1.mass - b2.mass) + 2 * b2.mass * v2n) /
            (b1.mass + b2.mass);
          const v2nNew =
            (v2n * (b2.mass - b1.mass) + 2 * b1.mass * v1n) /
            (b1.mass + b2.mass);
          b1.vel = Vector.add(v1t,(Vector.mult(n,v1nNew)));
          b2.vel = Vector.add(v2t,(Vector.mult(n,v2nNew)));
        }
      }
    }
    // edge collision;
    const leftbound = 0;
    const upbound = 0;
    const rightbound = world.width;
    const downbound = world.height;
    if (
      world.dynamicBodies[i].pos.x - world.dynamicBodies[i].shape.radius <
      leftbound
    ) {
      world.dynamicBodies[i].pos.x =
        leftbound + world.dynamicBodies[i].shape.radius;
      world.dynamicBodies[i].vel.x *= -1;
    }
    if (
      world.dynamicBodies[i].pos.x + world.dynamicBodies[i].shape.radius >
      rightbound
    ) {
      world.dynamicBodies[i].pos.x =
        rightbound - world.dynamicBodies[i].shape.radius;
      world.dynamicBodies[i].vel.x *= -1;
    }
    if (
      world.dynamicBodies[i].pos.y - world.dynamicBodies[i].shape.radius <
      upbound
    ) {
      world.dynamicBodies[i].pos.y =
        upbound + world.dynamicBodies[i].shape.radius;
      world.dynamicBodies[i].vel.y *= -1;
    }
    if (
      world.dynamicBodies[i].pos.y + world.dynamicBodies[i].shape.radius >
      downbound
    ) {
      world.dynamicBodies[i].pos.y =
        downbound - world.dynamicBodies[i].shape.radius;
      world.dynamicBodies[i].vel.y *= -1;
    }
  }
}

function touching(b1: DynamicBody, b2: DynamicBody): boolean {
  if (
    (b1.shape instanceof Circle || b1.shape instanceof Elephant) &&
    (b2.shape instanceof Circle || b2.shape instanceof Elephant)
  ) {
    const d = Vector.sub(b1.pos,b2.pos).mag();
    const r1 = b1.shape.radius;
    const r2 = b2.shape.radius;
    return d < r1 + r2;
  }
  return false;
}
