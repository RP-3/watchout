
//will be used to set properties of the svg element
var width = 400;
var height = 400;

var enemyCount = 10; //stores number of emenies



var svg = d3.select("body").append("svg") //create svg element
	.attr("width", width) //set svg width using css attr()
	.attr("height", height); //set svg height using css attr()

//group all nodes inside svg element (for reference later)
var enemyGroup = svg.append("g");

