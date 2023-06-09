// define the degrees_file_loc
degrees_file_loc = 'https://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv'
dataset = [];

var rawConverter = function (d) {
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
    dataset.push(data);
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
    var width = d3.select("body").node().getBoundingClientRect().width - 100;
    var n = 42;
    var bar_width = (width/(n+2));
    //d3.select("#textContainer").append("h1").text(d.Agriculture);
    var svg = d3.select("body")
        .select("#chart")
        .append("svg");

    svg.attr("width", width)
       .attr("height", height)
       .attr("display", "block") // centers svg
       .attr("margin", "auto");

    var rects = svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle");

    rects.attr("cx", function(d, i) { return bar_width*(i+1);})
       .attr("cy", function(d) {return height-(height/100)*d.Computer_Science - 20; }) 
       .attr("r", 5)

    rects.attr("fill", "teal");

    var text = svg.selectAll("text")
    .data(dataset)
    .enter();
    
    var xScale = d3.scaleLinear() .domain([1970,2011])
        .range([0, width-3*(bar_width)]);

    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
    .ticks(21);

    svg.append("g")
    .attr("class", "axis") //Assign "axis" class .call(xAxis);
    .attr("transform", "translate(" + bar_width + "," + (height-20) + ")")
    .call(xAxis);

    var yScale = d3.scaleLinear().domain([90,0]).range([0,height-40])
    var yAxis = d3.axisLeft().scale(yScale).ticks(10);

     //Create Y axis
     svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + bar_width + ",20)")
     .call(yAxis);

}