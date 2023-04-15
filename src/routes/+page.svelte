<script>
    import {
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";
    import Simulation from "../components/Simulation.svelte";
    import { World, worldtojson, jsontoworld } from "../physicslib/world";
    import { DynamicBody } from "../physicslib/bodies";
    import { Vector } from "../physicslib/vector";
    import { Circle, Elephant } from "../physicslib/shapes";
    const elebody = new DynamicBody(new Vector(100,150), new Vector(0,0), new Vector (0, 10), 10, new Circle(50));
    const circbody = new DynamicBody(new Vector(300,100), new Vector(30,0), new Vector (0, 10), 10, new Elephant(50));
    const other = new DynamicBody(new Vector(300,0), new Vector(30,0), new Vector (0, 10), 10, new Circle(10));



    const world = new World([], [elebody, circbody, other]);
    const jso = worldtojson(world);
    const world2 = jsontoworld(jso);


    
  
  </script>
  

<Grid>
    <Row>
    <Column>
        <Simulation world = {world2} />
    </Column>

    </Row>
</Grid>

  