#Interactive Data Visualization
# Table of Contents

1. <a href="#svg">SVG Practice</a>
2. <a href="#hello-world">My First D3</a>

# Learning SVG
<span id="svg">
    <svg width="300" height="200">
      <circle cx="90" cy="100" r="60" fill="rgba(255,0,0,0.3)" stroke = "rgba(0,0,255,0.3)" stroke-width = "15" />
      <circle cx="150" cy="100" r="60" fill="rgba(0,255,0,0.3)" stroke = "rgba(255,0, 0, 0.3)" stroke-width = "15"/>
      <circle cx="210" cy="100" r="60" fill="rgba(0,0,255,0.3)" stroke = "rgba(0 ,255,0, 0.3)" stroke-width = "15"/>
    </svg>
</span>
yay, it worked!

# my first D3 project
<span id="hello-world">
    <html>
        <head>
            <title>D3.js Test</title>
            <script type="text/javascript" src="https://d3js.org/d3.v5.min.js"></script>
        </head>
        <body>
            <div id="textContainer">
            <!-- D3 will write to this container -->
            </div>
            <script type="text/javascript">
            //write some text using d3.js
            d3.select("#textContainer").append("h1")
                .text("Hello D3.js!");
            </script>
        </body>
    </html>
</span>
