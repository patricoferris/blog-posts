var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("graph.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { console.log(d); return Math.sqrt(d.value); });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", function(d) { return color(d.group); })
    .on("mouseover", mouseOver(.7)/*function(d) {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div.html(d.id)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
    }*/)
    .on("mouseout", mouseOut/*function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    }*/)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  svg.selectAll("circle").on("click", function(){
    d3.select("p").text(d3.select(this)._groups[0][0].firstChild.innerHTML)
  });

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  var linkedByIndex = {};
    graph.links.forEach(function(d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

  function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
  }

  function mouseOver(opacity) {
          return function(d) {
              // check all other nodes to see if they're connected
              // to this one. if so, keep the opacity at 1, otherwise
              // fade
              node.style("stroke-opacity", function(o) {
                  thisOpacity = isConnected(d, o) ? 1 : opacity;
                  return thisOpacity;
              });
              node.style("fill-opacity", function(o) {
                  thisOpacity = isConnected(d, o) ? 1 : opacity;
                  return thisOpacity;
              });
              // also style link accordingly
              link.style("stroke-opacity", function(o) {
                  return o.source === d || o.target === d ? 1 : opacity;
              });
              link.style("stroke", function(o){
                  return o.source === d || o.target === d ? o.source.colour : "#ddd";
              });
          };
      }

      function mouseOut() {
          node.style("stroke-opacity", 1);
          node.style("fill-opacity", 1);
          link.style("stroke-opacity", 1);
          link.style("stroke", "#ddd");
      }



});

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
