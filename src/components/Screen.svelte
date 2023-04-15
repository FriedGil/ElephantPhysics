<script lang="ts">
    import { Canvas, Layer, t } from 'svelte-canvas';
    import type { Render } from "svelte-canvas";
    import type { World } from '../physics/world';
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
            world.time = $t;
            timeStamp = $t
            console.log()
            context.fill();
        }
        else{
            world.draw(context);
        }
    };

    export function pause(){
        world.tminus += $t-timeStamp;
        timeStamp = $t;
        if (paused){
                paused = false;
        }
        else {
            paused = true;
        }
    }

    export function isRunning(){
        return !paused;
    }

    export function getT(){
        return $t;
    }

  </script>
  
  <Canvas width={w} height={h} style="outline-style: dotted;">
    <Layer {render} />
  </Canvas>

  


