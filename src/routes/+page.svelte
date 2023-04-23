<script>
    import {
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";
    import Simulation from "../components/Simulation.svelte";
    import { World, worldtojson, jsontoworld } from "../physics/world";
    import { DynamicBody } from "../physics/bodies";
    import { Vector } from "../physics/vector";
    import { Circle, Elephant } from "../physics/shapes";
    import JsonURL from "@jsonurl/jsonurl";
    const elebody = new DynamicBody(new Vector(100,150), new Vector(0,0), new Vector (0, 10), 10, new Elephant(50), "Elephant 1");
    const circbody = new DynamicBody(new Vector(300,100), new Vector(30,0), new Vector (0, 10), 10, new Elephant(50), "Elephant 2");
    const other = new DynamicBody(new Vector(300,0), new Vector(30,0), new Vector (0, 10), 10, new Circle(10), "Ball 1" );



    const world = new World([], [elebody, circbody, other]);
    const jso = worldtojson(world);
    const world2 = jsontoworld(jso);


    
  
  </script>
  

<Grid>
    <Row>
    <Column>
        <Simulation config = {jso} />
    </Column>
    </Row>
</Grid>

  