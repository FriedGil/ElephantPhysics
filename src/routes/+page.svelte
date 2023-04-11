<script>
    import {
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";
    import Screen from "../components/Screen.svelte";
    import Simulation from "../components/Simulation.svelte";
    import { World } from "../physicslib/world";
    import { DynamicBody } from "../physicslib/bodies";
    import { Vector } from "../physicslib/vector";
    import { Circle, Elephant } from "../physicslib/shapes";
    const elebody = new DynamicBody(new Vector(100,500), new Vector(0,0), new Vector (0, 10), 10, new Circle(50));
    const circbody = new DynamicBody(new Vector(300,500), new Vector(30,0), new Vector (0, 10), 10, new Elephant(50));

    const elebody2 = new DynamicBody(new Vector(100,500), new Vector(0,0), new Vector (0, 10), 10, new Circle(50));
    const circbody2 = new DynamicBody(new Vector(300,500), new Vector(30,0), new Vector (0, 10), 10, new Elephant(50));

    const world = new World([], [elebody, circbody]);
    const world2 = new World([], [elebody2, circbody2]);

    
  
  </script>
  

<Grid>
    <Row>
    <Column>
        <Simulation world = {world} />
    </Column>
    <Column>
    <Simulation world = {world2} />
  </Column>
    </Row>
</Grid>

  