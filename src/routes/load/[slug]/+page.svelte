<script>
  import { page } from '$app/stores';
  import JsonURL from "@jsonurl/jsonurl"; 
  import { World, worldtojson, jsontoworld } from "../../../physics/world";
  import Simulation from '../../../components/Simulation.svelte';

  let conf = JsonURL.parse($page.params.slug);
  
</script>

<Simulation config = {conf} />

