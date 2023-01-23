# Necto tool
Necto is an open source web-based tool to see graphically dependencies in your source code. <br>
The use case of this first prototype is about python scripts and dependencies between classes.

<div align="center">
  <img src="https://github.com/mariocuomo/necto/blob/main/imgs/graph.png">
</div>

Necto is developed using javascript and D3.js.<br>
The graph is drawn using force directed approach and uses data in [data.json](https://github.com/mariocuomo/necto/blob/main/necto-tool/data.json) file. <br>

``` json
{
	"nodes": [
		{"id": "0", "name": "functionA" }, 
		{"id": "1", "name": "functionB" }, 
		{"id": "2", "name": "functionC" },
		{"id": "3", "name": "functionD" }
	],
	"links": [
		{"source": "0", "target": "1"}, 
		{"source": "0", "target": "2"},
		{"source": "1", "target": "3"}
	]
}
```

to-do list
- write a script to generate [data.json](https://github.com/mariocuomo/necto/blob/main/necto-tool/data.json) file.<br>
  it should tak in input a directory of python script.
- ...
