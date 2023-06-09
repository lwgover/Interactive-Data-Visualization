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

var dataset = [];
for (var i = 0; i < 25; i++) {
    var newNumber = Math.random() * 30; 
    dataset.push(newNumber);
}
d3.select("body")
    .select("div")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) { 
        console.log(d);
        return 5*d + "px";
    })
    .style("margin-right", "2px")
    .style("justify-content", "center");
