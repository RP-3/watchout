// start slingin' some d3 here.

var alphabet = "abcdefghijklmnopqrstuvwxyx".split("");

var width = 960;
var height = 500;

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
  .append("g")
  	.attr("transform", "translate(32," + (height/2)+ ")");

var update = function(data){
	//Join new data with old elements, if applicable
	var text = svg.selectAll("text")
		.data(data);

	//update old elements as required
	text.attr("class", "update");

	//create new elements as needed
	text.enter().append("text")
		.attr("class", "enter")
		.attr("x", function(d, i){return i*32;})
		.attr("dy", ".35em");

	//Enter and update
	text.text(function(d){return d;});

	//exit
	text.exit().remove();
}	

//initial display
update(alphabet);

//grab random letters from alphabet, in alphabetical order
setInterval(function() {
update(shuffle(alphabet)
  .slice(0, Math.floor(Math.random() * 26))
  .sort());
}, 1500);



//extranious shuffling function. Unimportant.
var shuffle = function(array){
	var m = array.length;
	var t;
	var i;

	while(m){
		i = Math.floor(Math.random() * m);
		m--;
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}















