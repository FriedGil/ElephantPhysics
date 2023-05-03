<script lang="ts">
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    NumberInput,
    Button,
    Form,
    FormGroup,
    Checkbox,
    RadioButtonGroup,
    RadioButton,
    Select,
    SelectItem,
    Column,
    Row,
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
    <FormGroup legendText="Labels">
      <Checkbox id="checkbox-0" labelText="Center of Mass" checked />
      <Checkbox id="checkbox-1" labelText="Body ID" />
    </FormGroup>
    <FormGroup legendText="Vector Arrows">
      <Checkbox id="checkbox-2" labelText="Net Velocity" checked />
      <Checkbox id="checkbox-3  " labelText="Net Acceleration" />
    </FormGroup>

    <FormGroup legendText="Universal Constants">
      <Row>
        <Column>
           <NumberInput hideSteppers label="X Velocity" value={0}/>
        </Column>
        <Column>
          <NumberInput hideSteppers label="Y Velocity" value={0}/>
        </Column>
      </Row>
      <Row>
        <Column>
           <NumberInput hideSteppers label="X Acceleration" value={0}/>
        </Column>
        <Column>
          <NumberInput hideSteppers label="Y Acceleration" value={0}/>
        </Column>
      </Row>
    </FormGroup>
    
    <FormGroup>
      <Select id="select-1" labelText="Select menu" value="placeholder-item">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
      </Select>
    </FormGroup>
  </ModalBody>

  <ModalFooter primaryButtonText="Save Changes"/>
</ComposedModal>
