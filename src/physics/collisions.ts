import type { DynamicBody } from "./bodies";
import { Circle, Elephant } from "./shapes";
import { Vector } from "./vector";
import type { World } from "./world";

export function collision(world: World) {
  for (let i = 0; i < world.dynamicBodies.length; i++) {
    for (let j = 0; j < world.dynamicBodies.length; j++) {
      if (i != j) {
        if (touching(world.dynamicBodies[i], world.dynamicBodies[j])) {
          const b1 = world.dynamicBodies[i];
          const b2 = world.dynamicBodies[j];
          const d = b1.pos.sub(b2.pos).mag();
          const r1 = b1.shape.radius;
          const r2 = b2.shape.radius;
          const overlap = r1 + r2 - d;
          const n = b1.pos.sub(b2.pos).norm();
          b1.pos = b1.pos.add(n.mult(overlap / 2));
          b2.pos = b2.pos.sub(n.mult(overlap / 2));
          const v1n = b1.vel.dot(n);
          const v2n = b2.vel.dot(n);
          const v1t = b1.vel.sub(n.mult(v1n));
          const v2t = b2.vel.sub(n.mult(v2n));
          const v1nNew =
            (v1n * (b1.mass - b2.mass) + 2 * b2.mass * v2n) /
            (b1.mass + b2.mass);
          const v2nNew =
            (v2n * (b2.mass - b1.mass) + 2 * b1.mass * v1n) /
            (b1.mass + b2.mass);
          b1.vel = v1t.add(n.mult(v1nNew));
          b2.vel = v2t.add(n.mult(v2nNew));
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
    const d = b1.pos.sub(b2.pos).mag();
    const r1 = b1.shape.radius;
    const r2 = b2.shape.radius;
    return d < r1 + r2;
  }
  return false;
}
