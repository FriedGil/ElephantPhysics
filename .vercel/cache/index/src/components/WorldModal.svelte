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




</script>



<ComposedModal bind:open on:close={()=>(conf = config)} on:submit={() => (open = false, config=conf, reset())}>
  <ModalHeader label="World" title="Edit World Properties" />
  <ModalBody>

  </ModalBody>

  <ModalFooter primaryButtonText="Save Changes"/>
</ComposedModal>
