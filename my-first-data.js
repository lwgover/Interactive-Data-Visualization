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
d3.csv("http://www.lucasgover.com/Interactive-Data-Visualization/percent_bachelors_degrees_women_usa.csv", function(rawData) {
    
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


var draw_svg = function () {
    //d3.select("#textContainer").append("h1").text(d.Agriculture);
    console.log(dataset);
    d3.select("body")
        .select("div")
        .selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d) { 
            console.log(d);
            return 5*d.Computer_Science + "px";
        })
        .style("margin-right", "2px");
}


