<script lang="ts">

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
    import type { World } from "../physics/world";
    import { Content } from "carbon-components-svelte";
	export let world: World;
	let temp = 0;
	let data: any[] = [
	// {
	// 	"group": "Dataset 1",
	// 	"key": 0,
	// 	"value": 34200}
	// 	,
	// {
]
export function reset(){
	data = [];
}
export function addData(datapoint: any[]){
	data.push(datapoint);
	data = data;
}

export function update(){
	world.dynamicBodies.forEach((b)=>{
		data.push({"group": b.id, "key": world.realTime()/1000, "value": 0 - b.vel.x });
	})
	data = data;
}
</script>

<Content>
	<LineChart
	data= {data}
	options={{
	"title": "X Velocity over Time",
	"axes": {
		"bottom": {
			"title": "Time",
			"mapsTo": "key",
		},
		"left": {
			"mapsTo": "value",
			"title": "Velocity",
		}
	},
	"height": "400px"
}}
	/>	
</Content>

