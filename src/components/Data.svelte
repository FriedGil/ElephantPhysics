<script lang="ts">

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
    import type { World } from "../physics/world";
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
	data.push({"group": "Ball 1", "key": world.realTime()/1000, "value": 0 -world.dynamicBodies[0].vel.y });
	data.push({"group": "Ball 2", "key": world.realTime()/1000, "value": 0 - world.dynamicBodies[1].vel.y });
	data.push({"group": "Ball 3", "key": world.realTime()/1000, "value": 0 - world.dynamicBodies[2].vel.y });


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
