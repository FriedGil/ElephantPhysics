<script lang="ts">
    import { onMount } from "svelte";
    import type { World } from "../physics/World";

    export let world: World;
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let dim: number;

    onMount(()=>{
        dim = Math.max(window.innerWidth/3,300);
        canvas.width = dim;
        canvas.height = dim;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.translate(canvas.width/2,canvas.height/2);
    });

    export function handleResize(){
        dim = Math.max(window.innerWidth/3,300);
        canvas.width = dim;
        canvas.height = dim;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.translate(canvas.width/2,canvas.height/2);
    }
    export function draw(t: number){
        ctx.clearRect(-canvas.width, -canvas.height/2, canvas.width+canvas.width/2,canvas.height+canvas.height/2);
        let w = world.getState(t);
        w.forEach((p)=>{
            ctx.beginPath();
            ctx.arc(p.p.x, 0-p.p.y, p.r, 0, 2 * Math.PI);
            ctx.fill();
        })
    }

</script>

<canvas bind:this={canvas}>

</canvas>


<style>
	canvas { background: #eee; }
</style>

<svelte:window on:resize={handleResize}/>