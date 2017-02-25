var stage = new Konva.Stage({
    container: 'container',
    width: 1000,
    height: 1000
});

// set up layer
var layer = new Konva.Layer();
// size of triangles
const T_SIZE = 10;

// custom shape for triangles on the graph, these dont move
const Triangle = function(x, y, color) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x, y);
	    context.lineTo(x + T_SIZE*2, y + T_SIZE);
	    context.lineTo(x + T_SIZE*4, y);
	    context.lineTo(x + T_SIZE*2, y - T_SIZE);
	    context.lineTo(x, y);
	    context.closePath();
	    context.fillStrokeShape(this);
	},
	stroke: color,
  strokeWidth: 1
    });
}
// custom shape that can be dragged on the grid
const mTriangle = function(x, y, color) {
    return new Konva.Shape({
	sceneFunc: function(context) {
	    context.beginPath();
	    context.moveTo(x, y);
	    context.lineTo(x + T_SIZE*2, y + T_SIZE);
	    context.lineTo(x + T_SIZE*4, y);
	    context.lineTo(x + T_SIZE*2, y - T_SIZE);
	    context.lineTo(x, y);
	    context.closePath();
	    context.fillStrokeShape(this);
	},
	stroke: color,
  strokeWidth: 1,
  draggable: true,
  shadowColor: 'black',
  shadowBlur: 3,
  shadowOffset: {x : 3, y : 3},
  shadowOpacity: .7,
  dragBoundFunc: function(pos) {
      var newX = Math.floor(pos.x / 20);
      if (newX % 2 === 0){
        var newY = Math.floor(pos.y / 20) + 0.5;
      } else {
        var newY = Math.floor(pos.y / 20);
      }
      return {
        x: newX * 20,
        y: newY * 20
      };
    }
    });
}
const someTrianglesWidth = function(x, y, width, height) {
    return new Konva.Shape({
	sceneFunc: function(context) {
    var j = 2;
    context.beginPath();
    context.moveTo(x, y);
    for (j = 0; j < height; j++){
    for (i = 1; i <= width; i++){
      context.lineTo(x + i * 2 * T_SIZE, y - i * T_SIZE);
      context.lineTo(x + (i + 1) * 2 * T_SIZE + 2 * j * T_SIZE, y - (i - 1) * T_SIZE + j * T_SIZE);
      context.lineTo(x +  (j+1)* 2 * T_SIZE, y + (j+1) * T_SIZE);
      context.closePath();
    }
  }
    context.fillStrokeShape(this);
	},
	stroke: 'black',
  strokeWidth: 1,
  draggable: true,
  shadowColor: 'black',
  shadowBlur: 3,
  shadowOffset: {x : 3, y : 3},
  shadowOpacity: .7,
  dragBoundFunc: function(pos) {
      var newX = Math.floor(pos.x / 20);
      if (newX % 2 === 0){
        var newY = Math.floor(pos.y / 20) + 0.5;
      } else {
        var newY = Math.floor(pos.y / 20);
      }
      return {
        x: newX * 20,
        y: newY * 20
      };
    }
    });
}

// draw the graph of tiles on a layer
const drawGraph = function() {
  for (i = 0; i <= stage.width(); i += 2*T_SIZE) {
    var verticalLine = new Konva.Line({
      points: [i , 0, i , stage.height()],
      stroke: 'rgb(222, 222, 222)',
      strokeWidth: 1
    });
    verticalLine.move ({
      x: 20,
      y: 20
    });
    layer.add(verticalLine);
  }

  for (i = 0; i <= stage.width(); i += T_SIZE * 4) {
     for (j = 0; j <= stage.height(); j += T_SIZE * 2 ) {
         var triangle = new Triangle(i, j, 'rgb(222,222,222)');
         triangle.move ({
           x: 20,
           y: 30
         });
         layer.add(triangle);
       }
  }
  var horizontalLine = new Konva.Line({
    points: [0, 0, stage.width(), 0],
    stroke: 'rgb(222, 222, 222)',
    strokewidth: 1
  });

  horizontalLine.move({
    x: 20,
    y: 20
  });
  layer.add(horizontalLine);

}

// spawns a tile on a button click
function spawnTile() {
  tile = new mTriangle (500, 500, 'black');
  tile.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
  });
  tile.on('mouseout', function() {
      document.body.style.cursor = 'default';
  });
  layer.add(tile);
}
// spawn a grid of tiles
function spawnSomeTiles() {
    let width = Math.floor(parseInt($('#width').val()));
    let height = Math.floor(parseInt($('#height').val()));
    var group = new someTrianglesWidth(500, 500, width, height);
    group.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', function() {
	document.body.style.cursor = 'default';
    });
    layer.add(group);
}

// draw the graph
drawGraph();
// add the layer to stage
stage.add(layer);

// wire up buttons to spawn functions
$(document).ready(function(){
  $('#tile').click(function(){
    spawnTile();
    stage.add(layer);
  });
  $('#TileGrid').click(function(){
    spawnSomeTiles();
    stage.add(layer);
  });
});
/*            shadowColor: 'black',
            shadowBlur: 3,
            shadowOffset: {x : 3, y : 3},
            shadowOpacity: 1, */
