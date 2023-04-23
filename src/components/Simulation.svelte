<script lang="ts">
        import { onMount } from "svelte";
        import { Elephant, Circle } from "../physics/shapes";
        import { DynamicBody } from "../physics/bodies";
        import { Vector } from "../physics/vector";
        import {jsontoworld, worldtojson} from "../physics/world";
        import type { World } from "../physics/world";
        import Screen from "./Screen.svelte";
        import Pause from "carbon-icons-svelte/lib/Pause.svelte";
        import Add from "carbon-icons-svelte/lib/Add.svelte";
        import Reset from "carbon-icons-svelte/lib/Reset.svelte";
        import Copy from "carbon-icons-svelte/lib/Copy.svelte";
        import Checkbox from "carbon-icons-svelte/lib/Checkbox.svelte";
        import EarthAmericas from "carbon-icons-svelte/lib/EarthAmericas.svelte";
        import { Button, ButtonSet, Column, CopyButton, Grid, Row, SideNavDivider } from 'carbon-components-svelte';
        import { Tile } from "carbon-components-svelte";
        import Data from "./Data.svelte";
        import { Slider } from "carbon-components-svelte";
        import JsonURL from "@jsonurl/jsonurl";
        import BodiesModal from "./BodiesModal.svelte";
        import SlidersModal from "./SlidersModal.svelte";
        import WorldModal from "./WorldModal.svelte";

        export let config: any;
        let world: World = jsontoworld(config);
        let screen: Screen;
        let data: Data;
        let url: string;
        let bmod: BodiesModal, smod: SlidersModal, wmod: WorldModal;


        function update(){
            if (screen.isRunning()){
                data.update();
            }
        }

        onMount(()=>{
            url = window.location.origin;
            setInterval(() => {update()}, 500)

        });
        export function reset(){
            world = jsontoworld(config);
            world.tminus = screen.getT();
            data.reset();
        }
    </script>


<Grid>
    <Row>
    <Column>
        <Row>
            <Tile>
                <h2>
                    Screen
                </h2>
                <Screen bind:this={screen}  world = {world}/>
            </Tile>
        </Row>
        <Row>
        <Tile>
        <h2>
            Control Panel
        </h2>
            <Row>
                <Button    size="field" iconDescription="Pause" kind="primary"  icon={Pause} on:click={screen.pause}>
                    Pause
                </Button>
                <Button    size="field" iconDescription="Reset"  kind="danger" icon={Reset} on:click={reset}>
                    Reset
                </Button>
                <Tile light>
                    <Slider hideTextInput   min={1} max={10} labelText="Speed" bind:value={world.speed} /> 
                </Tile>
            </Row>
        <Row>
            <Button   size="field" kind="secondary"  iconDescription="Edit Bodies" icon={Checkbox} on:click={bmod.toggle} on:click={screen.pauseNoToggle}>
                Edit Bodies
            </Button>
            <Button    size="field" kind="tertiary" iconDescription="Edit World"  icon={EarthAmericas} on:click={wmod.toggle} on:click={screen.pauseNoToggle}>
                Edit World
            </Button>
            <Button    size="field" kind="secondary" iconDescription="Add Slider"  icon={Add} on:click={smod.toggle} on:click={screen.pauseNoToggle}>
                Add Slider
            </Button>
            <!-- <Button  size="field" kind="ghost" icon={Copy} >
                Copy
            </Button> -->
            <CopyButton text="{url + "/load/" + JsonURL.stringify(config)}"/>
        </Row>
    </Tile>
    </Row>
        
    </Column>
    <Column>
        <Data bind:this={data} world = {world}/>
    </Column>
    </Row>
</Grid>


<BodiesModal bind:this={bmod} bind:config={config} reset = {reset}/>
<WorldModal bind:this={wmod}  bind:config={config} reset = {reset}/>
<SlidersModal bind:this={smod} />