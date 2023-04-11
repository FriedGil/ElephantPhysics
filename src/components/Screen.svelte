<script lang="ts">
    import { Canvas, Layer, t } from 'svelte-canvas';
    import type { Render } from "svelte-canvas";
    import type { World } from '../physicslib/world';
    export let world: World;
    let render: Render;
    let paused = false;
    $: w = world.width;
    $: h = world.height;
    
    $: render = ({ context, width, height }) => {
        if (!paused){
            context.beginPath();
            world.update($t/100, context);
            context.fill();
        }
        else{
            world.draw(context);
        }
    };

    export function pause(){
        if (paused) paused = false;
        else paused = true;
    }
  </script>
  
  <Canvas width={w} height={h} style="outline-style: dotted;">
    <Layer {render} />
  </Canvas>

  


