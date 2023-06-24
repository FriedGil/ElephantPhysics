<script lang="ts">
    import { Button, Modal, NumberInput, TextInput, Tile } from "carbon-components-svelte";
    import { DownToBottom, TrashCan } from "carbon-icons-svelte";
    export let config: any;
    export let reset: any;
    
    let conf: any =  JSON.parse(JSON.stringify(config));


    function delBody(i: number){
      if (conf.particles.length-1 == 0) alert("Can't delete all particles.");
      else {
      conf.particles.splice(i,1);
      conf = conf;
    }
  }
  function duplicate(i: number){
      conf.particles.push(JSON.parse(JSON.stringify(conf.particles[i])));
      conf = conf;
  }
  let open = false;

  export function toggle(){
        if (open) open = false;
        else open = true;
    }
</script>


<Modal 
  bind:open on:submit={()=>{open = false, config=conf, reset()}}
  modalHeading="Particles Editor"
  primaryButtonText="Save Changes"
  secondaryButtonText="Cancel">


    {#each conf.particles as b, i}
    <tr>
        <!-- <th>ID</th> -->
        <th>Radius</th>
        <th>Mass</th>
        <th>X</th>
        <th>Y</th>
        <th>Vx</th>
        <th>Vy</th>
        <th>Ax</th>
        <th>Ay</th>
      </tr>
    <tr>
      <!-- <td><TextInput size="sm" bind:value={b.id}/></td> -->
      <td><NumberInput  size="sm" hideSteppers bind:value={b.r}/></td>
      <td><NumberInput size="sm"  hideSteppers bind:value={b.m}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.x}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.y}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.vx}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.vy}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.ax}/></td>
      <td><NumberInput size="sm" hideSteppers  bind:value={b.ay}/></td>
      <td><Button size="small" kind="tertiary" iconDescription="Duplicate" icon={DownToBottom} on:click={()=>{duplicate(i)}}/></td>
      <td><Button size="small" kind="danger-tertiary" iconDescription="Delete" icon={TrashCan} on:click={()=>{delBody(i)}}/></td>
    </tr>
  {/each}

  </Modal>