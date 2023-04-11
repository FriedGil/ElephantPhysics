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

        export let world: World;
        let screen: Screen;
        let data: Data;

        let time = 3;

		

        function update(){
            data.addData( {
		"group": "Dataset 1",
		"key": time++,
		"value": 34200})
        }
	
        
    
    </script>


<Grid>
    <Row>

    <Column>
        <Screen bind:this={screen} world = {world}/>
        <ButtonSet>
            <Button    iconDescription="Pause" icon={Pause} on:click={screen.pause}>
                Pause
            </Button>
            <Button    iconDescription="Reset"  on:click={data.reset}>
                Reset
            </Button>
            <Button    iconDescription="Update"  on:click={update}>
                Update
            </Button>
        </ButtonSet>    
    </Column>

    <Column>
        <Data bind:this={data}/>
    </Column>
    
    </Row>
</Grid>

