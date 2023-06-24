<script lang="ts">
    import { page } from '$app/stores';
    import JsonURL from "@jsonurl/jsonurl"; 
      import { Button, Column, Content, Grid, Row, Slider } from 'carbon-components-svelte';
    import { World, json2w, w2json } from '../../physics/World';
    import Canvas from '../../components/Canvas.svelte';
    import Data from '../../components/Data.svelte';
    import EditorModal from '../../components/EditorModal.svelte';
    import { onMount } from 'svelte';
  
    let conf = JsonURL.parse($page.params.slug);
    let w = json2w(conf);
    let value: number;
    let can: Canvas;
    let bMod: EditorModal;
    function update(){
        can.draw(value);
    }
    function reset(){
        w = json2w(conf);
        update();
    }
    onMount(()=>{
        update();
    });


    
    
  </script>
  
  
  <Grid>
    <Row>
        <Column style="   outline-style: solid;">
        <Slider min={0} max={20} labelText="Time" step={.05} bind:value = {value} on:change={update}/>
    
        <Canvas bind:this={can} world = {w}/>
        <Row>
        <Column>
            <Button   size="field" kind="secondary"  iconDescription="Edit Bodies" on:click={bMod.toggle}>
                Edit Particles
            </Button>
            <Button   size="field" kind="secondary"  iconDescription="Edit Bodies" on:click={() => alert("not implemented")}>
                Upload/Save
            </Button>
        </Column>
        </Row>
    
        </Column> 
        <Column style="   outline-style: solid;">
            <Data bind:world = {w}/>
        </Column>
    </Row>


</Grid>

<EditorModal bind:this={bMod} bind:config={conf} reset={reset}/>
