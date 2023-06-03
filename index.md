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
    <meta charset="utf-8">
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <div id="textContainer">
      <!-- D3 will write to this container -->
    </div>
    <script type="text/javascript">
      //write some text using d3.js
      d3.select("#textContainer").append("h1")
          .text("Hello D3.js!");
    </script>
</span>
