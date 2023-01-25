function drawGraph(graph) {
  const width = "1200";
  const height = "1200";

  radius = 20;

  var svg = d3.select("#graphdrawing")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force('charge', d3.forceManyBody()
        .strength(-1900)
        .theta(0.5)
        .distanceMax(1500)
      )
      .force('collision', d3.forceCollide().radius(function(d) {
              return d.radius}))
    //.force("center", d3.forceCenter(document.querySelector("#graphdrawing").clientWidth / 2, document.querySelector("#graphdrawing").clientHeight/2));
    .force("center", d3.forceCenter(width / 2, width/4));

  console.log(document.querySelector("#graphdrawing").clientWidth)
   
  svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.5)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "black")


  var link = svg.append("g")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")



  link
    .style("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#end)");




  var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", radius)
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node
      .style("fill", "lightblue")
      .style("fill-opacity","1")
      .style("stroke", "black")

  var label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .text(function(d) { return d.name; })
      .attr("class", "label");

  label 
      .on("mouseover", function(d){
                  tooltip.html(`${d.name}`); 
                  return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})


  node
      .on("mouseover", function(d){
                  tooltip.html(`${d.name}`); 
                  return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

         
  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);



  function ticked() {
      var arrowheadLength = 10
      link.each(function(d) {
        var x1 = d.source.x,
            y1 = d.source.y,
            x2 = d.target.x,
            y2 = d.target.y,
            angle = Math.atan2(y2 - y1, x2 - x1);
            d.targetX = x2 - Math.cos(angle) * (radius - arrowheadLength);
            d.targetY = y2 - Math.sin(angle) * (radius - arrowheadLength);
      });

      node
          .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
          .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d){return d.targetX; })
          .attr("y2", function(d){return d.targetY; })
      
      label
          .attr("x", function(d) { return d.x; })
          .attr("y", function (d) { return d.y; });
      }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "#626D71")
      .style("border-radius", "6px")
      .style("text-align", "center")
      .style("width", "auto")
      .text("");
        
}




/*
========================
          MAIN
========================
*/
d3.json("data.json",function(error,data){
  drawGraph(data)
});