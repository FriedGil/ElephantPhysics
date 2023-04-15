<script lang="ts">

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
    import type { World } from "../physicslib/world";
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
	data.push({"group": "Elephant", "key": world.time/1000, "value": world.dynamicBodies[1].vel.y });
	data.push({"group": "Ball", "key": world.time/1000, "value": world.dynamicBodies[0].vel.y });

	data = data;
}
</script>

<LineChart
	data= {data}
	options={{
	"title": "Y Velocity over Time",
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
