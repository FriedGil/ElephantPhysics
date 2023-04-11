<script>
// @ts-nocheck

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	let data = [
	{
		"group": "Dataset 1",
		"key": 0,
		"value": 34200}
		,
	{
		"group": "Dataset 1",
		"key": 1,
		"value": 23500
	},
	{
		"group": "Dataset 1",
		"key": 2,
		"value": 53100
	},
]
export function reset(){
	data = [];
}
export function addData(datapoint){
	data.push(datapoint);
	data = data;
}
</script>

<LineChart
	data= {data}
	options={{
	"title": "Elephant",
	"axes": {
		"bottom": {
			"title": "Time",
			"mapsTo": "key",
			"scaleType": "labels"
		},
		"left": {
			"mapsTo": "value",
			"title": "Velocity",
			"scaleType": "linear"
		}
	},
	"height": "400px"
}}
	/>
