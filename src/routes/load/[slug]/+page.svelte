<script>
  import { page } from '$app/stores';
  import JsonURL from "@jsonurl/jsonurl"; 
  import { World, worldtojson, jsontoworld } from "../../../physics/world";
  import Simulation from '../../../components/Simulation.svelte';
    import { Content, Grid } from 'carbon-components-svelte';
    import Navbar from '../../../components/Navbar.svelte';

  let conf = JsonURL.parse($page.params.slug);
  
</script>

<Navbar/>

<Grid>
  <Simulation config = {conf} />
</Grid>

