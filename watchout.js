
//will be used to set properties of the svg element
var width = 400;
var height = 400;

var enemyData = [
	{"cx": 20, "cy": 20, "radius": 20, "color": "blue"}];


//our primary svg element. everything will go inside this
var svg = d3.select("body").append("svg") //create svg element
	.attr("width", width) //set svg width using css attr()
	.attr("height", height); //set svg height using css attr()

//add a group to hold all enemies
var enemyGroup = svg.append("g");

//add enemies to enemy group
var enemies = enemyGroup.selectAll("circle") //select all "enemy", existing or not
	.data(enemyData) //refers to enemyData array
	.enter() //selects only html nodes not in existence
	.append("circle"); //appends nodes to enemygroup (inside svg)

//add enemy attributes as a property of enemies, defined above
var enemyAttributes = enemies
  .attr("cx", function(d){return d.cx;})
  .attr("cy", function(d){return d.cy;})
  .attr("r", function(d){return d.radius;})
  .attr("transform", "translate("+
    Math.floor(Math.random()*width)+","+
    Math.floor(Math.random()*height)+")")
  .style("fill", function(d){return d.color;});


