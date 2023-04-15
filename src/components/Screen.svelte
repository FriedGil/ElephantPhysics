<script lang="ts">
    import { Canvas, Layer, t } from 'svelte-canvas';
    import type { Render } from "svelte-canvas";
    import type { World } from '../physicslib/world';
    export let world: World;
    let render: Render;
    let timeStamp = 0;
    export let paused:boolean = false;
    $: w = world.width;
    $: h = world.height;
    
    $: render = ({ context, width, height }) => {
        if (!paused){
            context.beginPath();
            world.update($t-timeStamp, context);
            timeStamp = $t
            world.time = $t;
            context.fill();
        }
        else{
            world.draw(context);
        }
    };

    export function pause(){
        if (paused) paused = false;
        else paused = true;
        timeStamp = $t;
    }

    export function isRunning(){
        return !paused;
    }

  </script>
  
  <Canvas width={w} height={h} style="outline-style: dotted;">
    <Layer {render} />
  </Canvas>

  


