<script lang="ts">
    import type { World } from "../physics/World";
    import { LineChart } from "@carbon/charts-svelte";

    import "@carbon/styles/css/styles.css";
    import "@carbon/charts/styles.css";
    import { Content } from "carbon-components-svelte";
    import { Tabs, Tab, TabContent } from "carbon-components-svelte";
    import { RadioButtonGroup, RadioButton } from "carbon-components-svelte";
    import type { Particle } from "../physics/Particle";

    export let world: World;

    let data: any[] = [];

    let states: Particle[][] = []; 
    
    
    for (let i = 0; i < 20; i+=.1){
        states.push(world.getState(i));
    }
    function update(){
        data = [];
        if (selectedGraph == "Vel"){
            if (selectedDimension == "X"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.v.x });
                    });
                    }
                }
            
            else if (selectedDimension == "Y"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.v.y });
                    });
                    }
            }
            else if (selectedDimension == "Both"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id + " x", "key": i/10, "value": p.v.x});
                        data.push({"group": p.id + " y", "key": i/10, "value": p.v.y});
                    });
                    }
            }
        }
        else if (selectedGraph == "Pos") {
            if (selectedDimension == "X"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.p.x });
                    });
                    }
                }
            
            else if (selectedDimension == "Y"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.p.y });
                    });
                    }
            }
            else if (selectedDimension == "Both"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id + " x", "key": i/10, "value": p.p.x});
                        data.push({"group": p.id + " y", "key": i/10, "value": p.p.y});
                    });
                    }
            }
        }
        
        else if (selectedGraph == "Acc"){
            if (selectedDimension == "X"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.a.x });
                    });
                    }
                }
            
            else if (selectedDimension == "Y"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id, "key": i/10, "value": p.a.y });
                    });
                    }
            }
            else if (selectedDimension == "Both"){
                for (let i = 0; i < 200; i++){
                    states[i].forEach((p)=>{
                        data.push({"group": p.id + " x", "key": i/10, "value": p.a.x});
                        data.push({"group": p.id + " y", "key": i/10, "value": p.a.y});
                    });
                    }
            }
        }
        }
    

    let selectedGraph = "Vel";
    let selectedDimension = "X";
    update();

    
</script>

<Tabs autoWidth style="overflow: hidden;">
  
    <Tab label="Complete Graph" />
    <Tab label="Display Settings" />
    <svelte:fragment slot="content">
      <TabContent>

        <RadioButtonGroup bind:selected={selectedGraph} on:change={update}>
            <RadioButton labelText="Position" value="Pos"/>
            <RadioButton labelText="Velocity" value="Vel" />
            <RadioButton labelText="Acceleration" value="Acc" />
        </RadioButtonGroup>

        <RadioButtonGroup bind:selected={selectedDimension} on:change={update}>
            <RadioButton labelText="X" value="X"/>
            <RadioButton labelText="Y" value="Y" />
            <RadioButton labelText="Both" value="Both" />
        </RadioButtonGroup>

        <LineChart
        data= {data}
        options={{
        "title":  selectedDimension + " " + selectedGraph + " over Time",
        "axes": {
            "bottom": {
                "title": "Time",
                "mapsTo": "key",
            },
            "left": {
                "mapsTo": "value",
                "title": selectedDimension + " " + selectedGraph,
            }
        },
        "height": "400px",
        "width": "90%",
        }}
        />	        
      </TabContent>
      <TabContent>Display</TabContent>
    </svelte:fragment>
</Tabs>