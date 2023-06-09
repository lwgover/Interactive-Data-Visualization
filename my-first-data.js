// define the degrees_file_loc
let degrees_file_loc = 'https://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv'
var dataset = [];

var rawConverter = function (d) {
    console.log(d.Art_and_Performance);
    return {
        Year: parseInt(d.Year),
        Agriculture: parseFloat(d.Agriculture),
        Architecture: parseFloat(d.Architecture),
        Art_and_Performance: parseFloat(d.Art_and_Performance),
        Biology: parseFloat(d.Biology),
        Business: parseFloat(d.Business),
        Communications_and_Journalism: parseFloat(d.Communications_and_Journalism),
        Computer_Science: parseFloat(d.Computer_Science),
        Education: parseFloat(d.Education),
        Engineering: parseFloat(d.Engineering),
        English: parseFloat(d.English),
        Foreign_Languages: parseFloat(d.Foreign_Languages),
        Health_Professions: parseFloat(d.Health_Professions),
        Math_and_Statistics: parseFloat(d.Math_and_Statistics),
        Physical_Sciences: parseFloat(d.Physical_Sciences),
        Psychology: parseFloat(d.Psychology),
        Public_Administration: parseFloat(d.Public_Administration),
        Social_Sciences_and_History: parseFloat(d.Social_Sciences_and_History)
    }
};

// load and parse the csv data file using d3.csv() then display
d3.csv("https://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv", function(rawData) {
    
    var data = rawConverter(rawData);
    //console.log(data);
    console.log(typeof(data)); 
    dataset.push(data);
    //draw_svg(data);
    //console.log(typeof(dataset));
    if(dataset.length >=42){
        draw_svg()
    }
});


// var draw_svg = function () {
//     //d3.select("#textContainer").append("h1").text(d.Agriculture);
//     console.log(dataset);
//     d3.select("body")
//         //.select("div")
//         .select("#chart")
//         .selectAll("div")
//         .data(dataset)
//         .enter()
//         .append("div")
//         .attr("class", "bar")
//         .style("height", function(d) { 
//             console.log(d);
//             return 5*d.Computer_Science + "px";
//         })
//         .style("margin-right", "2px");
// }

var draw_svg = function () {
    var height = 400;
    var width = d3.select("body").node().getBoundingClientRect().width;
    var n = 42;
    var bar_width = (width/(n+2));
    //d3.select("#textContainer").append("h1").text(d.Agriculture);
    console.log(dataset);
    var svg = d3.select("body")
        .select("#chart")
        .append("svg");

    svg.attr("width", width)
       .attr("height", height)
       .attr("display", "block") // centers svg
       .attr("margin", "auto");

    var rects = svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect");

    rects.attr("x", function(d, i) { return bar_width*(i+1);})
       .attr("y", function(d) {return height-(height/100)*d.Computer_Science - 20; }) 
       .attr("width", bar_width-1)
       .attr("height", function(d) {return (height/100)*d.Computer_Science; });

    rects.attr("fill", "teal");

    var text = svg.selectAll("text")
    .data(dataset)
    .enter();

    text.append("text")
        .text(function(d) { return Math.round(d.Computer_Science);})
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("x", function(d, i) { return bar_width*(i+1) + (bar_width/2) - 6;})
        .attr("y", function(d) {return height-(height/100)*d.Computer_Science; });

    text.append("text")
        .text(function(d) { return Math.round(d.Year);})
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .attr("x", function(d, i) { return bar_width*(i+1) + (bar_width/2) - 12;})
        .attr("y", height-10 );


}