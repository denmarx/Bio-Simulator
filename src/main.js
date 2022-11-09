var width = 1200;
var height = 800;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// main API:
var imgMaltase = new Image();

imgMaltase.onload = function () {
  var img = new Konva.Image({
    x: 50,
    y: 200,
    image: imgMaltase,
    width: 600 / 1.5,
    height: 504 / 1.5,
    draggable: true,
  });

  // add the shape to the layer
  layer.add(img);
};
imgMaltase.src = '../ressources/Enzyme.jpg';

// main API:
var imgMaltose = new Image();

imgMaltose.onload = function () {
  var img = new Konva.Image({
    x: 800,
    y: 320,
    image: imgMaltose,
    width: 367 / 2,
    height: 220 / 2,
    draggable: true,
  });

  // add the shape to the layer
  layer.add(img);
};
imgMaltose.src = '../ressources/Maltose_1.png';
