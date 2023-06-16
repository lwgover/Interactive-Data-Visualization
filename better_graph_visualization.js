//Width and height
var w = d3.select("body").node().getBoundingClientRect().width * 0.75;
var h = 300;

//Define map projection
var projection = d3.geoAlbersUsa()
                        .translate([0, 0]);

//Define path generator
var path = d3.geoPath()
                    .projection(projection);
        
//Define quantize scale to sort data values into buckets of color
var color = d3.scaleQuantize()
                    .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
                    //Colors taken from colorbrewer.js, included in the D3 download

//Number formatting for population values
var formatAsThousands = d3.format(",");  //e.g. converts 123456 to "123,456"

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Define what to do when zooming
var zooming = function(d) {

    //Log out d3.event.transform, so you can see all the goodies inside
    //console.log(d3.event.transform);

    //New offset array
    var offset = [d3.event.transform.x, d3.event.transform.y];

    //Calculate new scale
    var newScale = d3.event.transform.k * 2000;

    //Update projection with new offset and scale
    projection.translate(offset)
                .scale(newScale);

    //Update all paths and circles
    svg.selectAll("path")
        .attr("d", path);

}

//Then define the zoom behavior
var zoom = d3.zoom()
                .on("zoom", zooming);

//The center of the country, roughly
var center = projection([-97.0, 39.0]);

//Create a container in which all zoom-able elements will live
var map = svg.append("g")
            .attr("id", "map")
            .call(zoom)  //Bind the zoom behavior
            .call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
                .translate(w/2, h/2)
                .scale(0.25)
                .translate(-center[0], -center[1]));

//Create a new, invisible background rect to catch zoom events
map.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("opacity", 0);

//Load in agriculture data
d3.csv("https://www.lucasgover.com/Interactive-Data-Visualization/data/us-ag-productivity.csv", function(data) {

    //Set input domain for color scale
    color.domain([
        d3.min(data, function(d) { return d.value; }), 
        d3.max(data, function(d) { return d.value; })
    ]);

    //Load in GeoJSON data
    d3.json("https://www.lucasgover.com/Interactive-Data-Visualization/data/us-states.json", function(json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {
    
            var dataState = data[i].state;				//Grab state name
            var dataValue = parseFloat(data[i].value);	//Grab data value, and convert from string to float
    
            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
            
                var jsonState = json.features[j].properties.name;
    
                if (dataState == jsonState) {
            
                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;
                    
                    //Stop looking through the JSON
                    break;
                    
                }
            }		
        }

        //Bind data and create one path per GeoJSON feature
        map.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                //Get data value
                var value = d.properties.value;
                
                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            });
            
            createZoomButtons();


    });

});

//Create zoom buttons
var createZoomButtons = function() {

    //Create the clickable groups

    //Zoom in button
    var zoomIn = svg.append("g")
        .attr("class", "zoom")	//All share the 'zoom' class
        .attr("id", "in")		//The ID will tell us which direction to head
        .attr("transform", "translate(" + (w - 110) + "," + (h - 70) + ")");

    zoomIn.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30);

    zoomIn.append("text")
        .attr("x", 15)
        .attr("y", 20)
        .text("+");
    
    //Zoom out button
    var zoomOut = svg.append("g")
        .attr("class", "zoom")
        .attr("id", "out")
        .attr("transform", "translate(" + (w - 70) + "," + (h - 70) + ")");

    zoomOut.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 30);

    zoomOut.append("text")
        .attr("x", 15)
        .attr("y", 20)
        .html("&ndash;");

    //Zooming interaction

    d3.selectAll(".zoom")
        .on("click", function() {

            //Set how much to scale on each click
            var scaleFactor;
            
            //Which way are we headed?
            var direction = d3.select(this).attr("id");

            //Modify the k scale value, depending on the direction
            switch (direction) {
                case "in":
                    scaleFactor = 1.5;
                    break;
                case "out":
                    scaleFactor = 0.75;
                    break;
                default:
                    break;
            }

            //This triggers a zoom event, scaling by 'scaleFactor'
            map.transition()
                .call(zoom.scaleBy, scaleFactor);

        });

};

//Initialize a simple force layout, using the nodes and edges in dataset
var force = d3.forceSimulation(dataset.nodes)
                .force("charge", d3.forceManyBody().strength(-60))
                .force("link", d3.forceLink(dataset.edges).distance(2))
                .force("center", d3.forceCenter().x(w/2).y(h/2));

var colors = d3.scaleOrdinal(d3.schemeCategory10);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create edges as lines
var edges = svg.selectAll("line")
    .data(dataset.edges)
    .enter()
    .append("line")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

//Create nodes as circles
var nodes = svg.selectAll("circle")
    .data(dataset.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .style("fill", function(d, i) {
        return colors(i);
    })
    .call(d3.drag()  //Define what to do on drag events
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded));

//show title div
nodes.on("mouseover", function(d) {

    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(d3.select(this).attr("cx"));
    var yPosition = parseFloat(d3.select(this).attr("cy")) + 20;

    //Update the tooltip position and value
    d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")						
        .select("#value")
        .text(d.name);

    //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);

})
.on("mouseout", function() {

    //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);
    
})

//Add a simple tooltip
nodes.append("title")
        .text(function(d) {
        return d.name;
        });

//Every time the simulation "ticks", this will be called
force.on("tick", function() {

    edges.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

    nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

});

//Define drag event functions
function dragStarted(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    if (!d3.event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}