// define the degrees_file_loc
let degrees_file_loc = 'https://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv'
var dataset;

var rawConverter = function (d) {
    return {
        Year: parseInt(d.Year),
        Agriculture: parseFloat(Agriculture),
        Architecture: parseFloat(Architecture),
        Art_and_Performance: parseFloat(Art_and_Performance),
        Biology: parseFloat(Biology),
        Business: parseFloat(Business),
        Communications_and_Journalism: parseFloat(Communications_and_Journalism),
        Computer_Science: parseFloat(Computer_Science),
        Education: parseFloat(Education),
        Engineering: parseFloat(Engineering),
        English: parseFloat(English),
        Foreign_Languages: parseFloat(Foreign_Languages),
        Health_Professions: parseFloat(Health_Professions),
        Math_and_Statistics: parseFloat(Math_and_Statistics),
        Physical_Sciences: parseFloat(Physical_Sciences),
        Psychology: parseFloat(Psychology),
        Public_Administration: parseFloat(Public_Administration),
        Social_Sciences_and_History: parseFloat(Social_Sciences_and_History)
    }
}

dataset = [];

// load and parse the csv data file using d3.csv() then display
d3.csv("http://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv", rawConverter, function(data) {
    //console.log(data);
    dataset = data;
    //draw_svg(data);
    //console.log(typeof(dataset));
});


var draw_svg = function (d) {
    //d3.select("#textContainer").append("h1").text(d.Agriculture);
}

var dataset=[25,7,5,26,11,8,25,14,23,19, 14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
    24,18,25,9,3];
d3.select("body").selectAll("div").select("#bar-chart")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) { 
        return 5*d + "px";
    })
    .style("margin-right", "2px");
