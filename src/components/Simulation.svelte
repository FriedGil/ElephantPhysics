<script lang="ts">
        import { onMount } from "svelte";
        import { Elephant, Circle } from "../physicslib/shapes";
        import { DynamicBody } from "../physicslib/bodies";
        import { Vector } from "../physicslib/vector";
        import type { World } from "../physicslib/world";
        import Screen from "./Screen.svelte";
        import Pause from "carbon-icons-svelte/lib/Pause.svelte";
        import Play from "carbon-icons-svelte/lib/Play.svelte";
        import { Button, ButtonSet, Column, Grid, Row } from 'carbon-components-svelte';
        import Data from "./Data.svelte";
        import { Slider } from "carbon-components-svelte";

        export let world: World;
        let screen: Screen;
        let data: Data;
        let updateIntervalId;



        function update(){
            if (screen.isRunning()){
                data.update();
            }
        }

        onMount(()=>{
            updateIntervalId = setInterval(update, 500/world.speed);
        });

        function resetInterval(){
            // on:change={resetInterval}
            updateIntervalId = setInterval(update, 500/world.speed);
        }
	
        
    
    </script>


<Grid>
    <Row>
    <Column>
        <Row>
            <Screen bind:this={screen} world = {world}/>
        </Row>
        <Row>
            <ButtonSet>
                <Button    iconDescription="Pause" icon={Pause} on:click={screen.pause}>
                    Pause
                </Button>
                <Button    iconDescription="Reset"  on:click={data.reset}>
                    Reset
                </Button>
            </ButtonSet>        
        </Row>
        <Row>
            <Slider   min={1} max={10} labelText="Speed" bind:value={world.speed} /> 
         </Row>
    </Column>
    <Column>
        <Data bind:this={data} world = {world}/>
    </Column>
    
    </Row>
</Grid>

