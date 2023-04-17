<script lang="ts">
    import {
      ComposedModal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Checkbox,
      DataTable,
      TextInput,
      NumberInput,
      Select,
      SelectItem,
      Button,
    } from "carbon-components-svelte";
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import type { World } from "../physics/world";
  
    let open = false;
    export let config: any;
    let conf: any = JSON.parse(JSON.stringify(config)); 

    export function toggle(){
        if (open) open = false;
        else open = true;
    }


    function delBody(i: number){
      conf.dynamicBodies.splice(i,1);
      conf = conf;
  }

  </script>

<style>
   table, th, td {
  border: 1px solid black;
}

</style>

<ComposedModal bind:open on:submit={() => (open = false, config=conf, console.log(conf), console.log(config))}>
    <ModalHeader label="Bodies" title="Add, Remove, or Edit Bodies" />
    <ModalBody hasForm>
      <table>
        <tr>
          <th>ID</th>
          <th>Shape</th>
          <th>Radius</th>
          <th>X</th>
          <th>Y</th>
          <th>Vx</th>
          <th>Vy</th>
          <th>Ax</th>
          <th>Ay</th>

        </tr>
        {#key conf.dynamicBodies}
        {#each conf.dynamicBodies as b, i}
          <tr>
            <td><input value={b.id}/></td>
            <td>Circle</td>
            <td><NumberInput  hideSteppers bind:value={b.radius}/></td>
            <td><NumberInput hideSteppers  bind:value={b.x}/></td>
            <td><NumberInput hideSteppers  bind:value={b.y}/></td>
            <td><NumberInput hideSteppers  bind:value={b.vx}/></td>
            <td><NumberInput hideSteppers  bind:value={b.vy}/></td>
            <td><NumberInput hideSteppers  bind:value={b.ax}/></td>
            <td><NumberInput hideSteppers  bind:value={b.ay}/></td>
            <Button kind="danger-tertiary" iconDescription="Delete" icon={TrashCan} on:click={()=>{delBody(i)}}/>
          </tr>
        {/each}
        {/key}
      </table>
      <Button>Add Body</Button>
      
    </ModalBody>

    <ModalFooter primaryButtonText="Save Changes"/>
  </ComposedModal>
  