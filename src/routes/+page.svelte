<script lang="ts">
    let value: number;
    let can: Canvas;
    import { Button, Column, Grid, Row, Slider, Tile, CopyButton } from "carbon-components-svelte";
    import Canvas from "../components/Canvas.svelte";
    import JsonURL from "@jsonurl/jsonurl";
    import { Particle } from "../physics/Particle";
    import { Vector } from "../physics/Vector";
    import { onMount } from "svelte";
    import { World, json2w, w2json } from "../physics/World";
    import Data from "../components/Data.svelte";
    import EditorModal from "../components/EditorModal.svelte";
    const p1 = new Particle(new Vector(0,150), new Vector(0,0), new Vector(0,-10), 5, 10);
    const p2 = new Particle(new Vector(0,100), new Vector(0,0), new Vector(0,0), 5, 10);

    let bMod: EditorModal;
    
    let w = new World([p1,p2]);
    let config = w2json(w);
    function update(){
        can.draw(value);
    }
    function reset(){
        w = json2w(config);
        update();
    }
    let url: string;
    onMount(()=>{
        url = window.location.origin;
        reset();
    });
    
</script>


<Grid>
    <Row>
        <Column style="   outline-style: solid;">
        <Slider min={0} max={20} labelText="Time" step={.05} bind:value = {value} on:change={update}/>
    
        <Canvas bind:this={can} world = {w}/>
        <Row>

            <Button   size="field" kind="secondary"  iconDescription="Edit Bodies" on:click={bMod.toggle}>
                Edit Particles
            </Button>


        <CopyButton text="{url + "/" + JsonURL.stringify(config)}"/>

        </Row>
    
        </Column> 
        <Column style="   outline-style: solid;">
            <Data bind:world = {w}/>
        </Column>
    </Row>


</Grid>

<EditorModal bind:this={bMod} bind:config={config} reset={reset}/>


