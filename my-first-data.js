// define the degrees_file_loc
let degrees_file_loc = 'http://www.lucasgover.com/Interactive-data-visualization/percent_bachelors_degrees_women_usa.csv'
var dataset;

var rawConverter = function(d) {
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

// load and parse the csv data file using d3.csv()
d3.csv(degrees_file_loc,rawConverter,function(data) {

	// create an array of years from our parsed data
	let yearsData = data.map(function(d) { return d.year; });

	// create scales to map years to the x axis and percent of degrees to the y axis
	let xScale = d3.scaleLinear() // need to define a scale type for x – linear is appropriate for chronological data	      .domain([d3.min(yearsData), d3.max(yearsData)]) // set min/max as min/max of years values 	      .range([padding, svgWidth - padding * 2]); // set range of output values

	let yScale = d3.scaleLinear() // set a linear type of scale scale range for our percentages	      .domain([0,100]) // set scale range as 0–100%	      .range([svgHeight - padding, padding]); // set range of output values

        // create an SVG viewport with dimensions specified earlier in ^svgWidth and ^svgHeight variables and appends it to the HTML body element)        
        let svg = d3.select("body") 	      .append ("svg") 	      .attr("width", svgWidth) 	      .attr("height", svgHeight);  

        // generate x & y-axis, using the scaling functions we define earlier in xScale and yScale    
        let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d")); // specify the bottom axis and use our xScale for scaling; also format the years with d3's format method which uses C-like syntax    
        let yAxis = d3.axisLeft().scale(yScale); // specify the left axis and use our defined yScale for scaling

        // draw axes with g elements placed at top and at right    
        svg.append("g")	          .attr("class", "x-axis") // gives class "x-axis" to newly created elements to be used for CSS editing	          .attr("transform", "translate(0," + (svgHeight - padding) + ")") //set their coordinates	          .call(xAxis);    

        svg.append("g")	          .attr("class", "y-axis") // gives class "y-axis" to newly created elements to be used for CSS editing	          .attr("transform", "translate(" + padding + ",0)") //set their coordinates	          .call(yAxis);

        // create line element that will draw our yearly values by mapping them through both our x and y scales (using D3's line generator)    
        let lineGenerator = d3.line()	          .x((d) => xScale(d['year']))    	           .y((d) => yScale(d[degreeType]))    	           .curve(d3.curveBasis); // make sure line is curved properly by setting curveBasis  

        // draw all lines based on data file    
            svg.append('path')	              .datum(data)       	              .attr('fill', 'none')        	              .attr('stroke', '#8AC21C')        	              .attr('stroke-width', 2)        	              .attr('d', lineGenerator);  

       });