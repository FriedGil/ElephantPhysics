<script lang="ts">
    import { Canvas, Layer, t } from 'svelte-canvas';
    import type { Render } from "svelte-canvas";
    import type { World } from '../physics/world';
    import { onMount } from 'svelte';
    export let world: World;
    let render: Render;
    let timeStamp = 0;
    export let paused: boolean = false;
    let widthmin: number;
    $: w = world.width;
    $: h = world.height;

    onMount(()=>{
        widthmin = window.innerWidth;
        if (w>widthmin) world.width = widthmin;
    })

    function handleResize () {
        widthmin = window.innerWidth;
        if (w>widthmin) world.width = widthmin;
	}

   
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

    export function pauseNoToggle(){
        world.tminus += $t-timeStamp;
        timeStamp = $t;
        paused = true;
        
    }

    export function isRunning(){
        return !paused;
    }

    export function getT(){
        return $t;
    }

  </script>
  {#key widthmin}
  <Canvas width={w} height={h} style="outline-style: dotted;">
    <Layer {render} />
  </Canvas>    
  {/key}

  <svelte:window on:resize|passive={handleResize} />

  


