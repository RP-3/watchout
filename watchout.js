
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
var enemies = enemyGroup.selectAll("enemy")
	.data(enemyData)
	.enter()
	.append("enemy");

//add enemy attributes as a property of enemies, defined above
var enemyAttributes = enemies.