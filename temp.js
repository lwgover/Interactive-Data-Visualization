//Width and height
var w = d3.select("body").node().getBoundingClientRect().width;
var h = window.innerHeight;

var colors = d3.scaleOrdinal(d3.schemeCategory10);
//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

 //Define what to do when zooming
var offset = [0,0];
var scale = 0.25;


var graph_simulation = d3.json("https://www.lucasgover.com/Interactive-Data-Visualization/movie_graph.json", function(dataset){

    svg.append("text")
        .text("hello world")
        .attr("x","50%")
        .attr("y","20%");

});