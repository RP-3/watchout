
//will be used to set properties of the svg element
var width = 400;
var height = 400;
var enemyCount = 20;
var radius = 5;
var enemyData = [];
var collisions = 0;

var score = 0;
var reset = false;

//dragging listener. increments attr by returned event parameters
d3.behavior.drag()
.on("drag", function(d){
  d.x += d3.event.dx;
  d.y += d3.event.dy;
  d3.select(this).attr("transform", function(d){
    return "translate(" + [ d.x,d.y ] + ")";
  });
});

//holds player attributes prior to rendering
var playerData = [{
  cx: 200,
  cy: 200,
  r: 8,
  id: "player",
  color: "red"
}];

//factory function for making enemies
var enemyMaker = function(i){
  var instance = {};
  instance.cx = Math.floor(Math.random()*width);
  instance.cy = Math.floor(Math.random()*height);
  instance.id = i;
  instance.r = radius;
  instance.color = "white";
  return instance;
};

//create data for D3 to manipulate
for (var i=0; i<enemyCount+1; i++){
  enemyData.push(enemyMaker(i));
}


//our primary svg element. everything will go inside this
var svg = d3.select("body").append("svg") //create svg element
	.attr("width", width) //set svg width using css attr()
	.attr("height", height); //set svg height using css attr()

//add a group to hold all enemies
var enemyGroup = svg.append("g");
var playerGroup = svg.append("g");

var update = function(enemyData){

  //Data join
  //select all existing enemies and perform the following
  var enemies = enemyGroup.selectAll("circle") //select all "enemy", existing or not
    .data(enemyData, function(d){return d.id;}); //refers to enemyData array

  var player = playerGroup.selectAll("circle")
   .data(playerData, function(d){return d.id;});

  //Update
  enemies.transition().duration(2000)
    .attr("cx", function(){return Math.floor(Math.random()*(width-20));})
    .attr("cy", function(){return Math.floor(Math.random()*(height-20));});

  //Enter
  enemies.enter().append("circle")
  .transition().duration(500)
    .attr("class", "enemy")
    .attr("cx", function(d){return d.cx;})
    .attr("cy", function(d){return d.cy;})
    .attr("r", function(d){return d.r;})
    .style("fill", function(d){return d.color;})
    .transition().duration(500)
      .style("fill", "grey");

  player.enter().append("circle")
  .transition().duration(2000)
  .attr("cx", function(d){return d.cx;})
  .attr("cy", function(d){return d.cy;})
  .attr("r", function(d){return d.r;})
  .attr("class", "player")
  .style("fill", function(d){return d.color;});

  player.call(d3.behavior.drag()
        .on("drag", function(d){
          var x = event.x -10;
          if (x<0){x=0;}
          if (x>width){x=width;}
          var y = event.y -65;
          if (y<0){y=0;}
          if (y>height){y=height;}
          d3.select(this).attr("cx", function(d){return x;})
                         .attr("cy", function(d){return y;});
        }));
};

var setScore = function(){
  var score = 0;
  setInterval(function(){
    if (reset){
      score = 0;
      reset = false;
    }else{
      score++;
      d3.selectAll(".current span").text(score);
    }
  }, 50);
};

setScore();

setInterval(function(){
  var enemyArray = d3.selectAll(".enemy")[0];
  var player = d3.selectAll(".player");
  for (var i=0; i<enemyCount+1; i++){
   var enemyX = enemyArray[i].cx.animVal.value;
   var enemyY = enemyArray[i].cx.animVal.value;
   var playerX = (d3.selectAll(".player"))[0][0].cx.animVal.value;
   var playerY = (d3.selectAll(".player"))[0][0].cx.animVal.value;
   var distance = Math.sqrt((enemyX - playerX)*(enemyX - playerX) + (enemyY - playerY)*(enemyY - playerY));
   if (distance<10){
    reset = true;
    d3
   }
  }
}, 100);

setInterval(function(){
  update(enemyData);
}, 2000);



