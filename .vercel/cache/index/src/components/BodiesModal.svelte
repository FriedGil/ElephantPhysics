<script lang="ts">
    import {
      ComposedModal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      NumberInput,
      Button,
    } from "carbon-components-svelte";
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import DownToBottom from "carbon-icons-svelte/lib/DownToBottom.svelte";
    let open = false;
    export let config: any;
    export let reset: any;
    let conf: any = JSON.parse(JSON.stringify(config)); 

    export function toggle(){
        if (open) open = false;
        else open = true;
    }


    function delBody(i: number){
      conf.dynamicBodies.splice(i,1);
      conf = conf;
  }
  function duplicate(i: number){
      conf.dynamicBodies.push(JSON.parse(JSON.stringify(conf.dynamicBodies[i])));
      conf = conf;
  }
    function addBody(){
      conf.dynamicBodies.push({
        id: "Unnamed",
        x: 100,
        y: 100,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        mass: 0,
        radius: 0,
      });
      conf = conf;
    }

  </script>

<style>
   table, th, td {
  border: 1px solid black;
}

</style>

<ComposedModal bind:open on:close={()=>(conf = config)} on:submit={() => (open = false, config=conf, reset())}>
    <ModalHeader label="Bodies" title="Add, Remove, or Edit Bodies" />
    <ModalBody hasForm>
      <table>
        <tr>
          <th>ID</th>
          <th>Shape</th>
          <th>Radius</th>
          <th>Mass</th>
          <th>X</th>
          <th>Y</th>
          <th>Vx</th>
          <th>Vy</th>
          <th>Ax</th>
          <th>Ay</th>


        </tr>
        {#each conf.dynamicBodies as b, i}
          <tr>
            <td><input bind:value={b.id}/></td>
            <td>Circle</td>
            <td><NumberInput  hideSteppers bind:value={b.radius}/></td>
            <td><NumberInput  hideSteppers bind:value={b.mass}/></td>
            <td><NumberInput hideSteppers  bind:value={b.x}/></td>
            <td><NumberInput hideSteppers  bind:value={b.y}/></td>
            <td><NumberInput hideSteppers  bind:value={b.vx}/></td>
            <td><NumberInput hideSteppers  bind:value={b.vy}/></td>
            <td><NumberInput hideSteppers  bind:value={b.ax}/></td>
            <td><NumberInput hideSteppers  bind:value={b.ay}/></td>
            <td><Button kind="tertiary" iconDescription="Duplicate" icon={DownToBottom} on:click={()=>{duplicate(i)}}/></td>
            <td><Button kind="danger-tertiary" iconDescription="Delete" icon={TrashCan} on:click={()=>{delBody(i)}}/></td>
          </tr>
        {/each}
      </table>
      <Button  icon={Add} iconDescription="Add Body" on:click={addBody}/>
      
    </ModalBody>

    <ModalFooter primaryButtonText="Save Changes"/>
  </ComposedModal>
  