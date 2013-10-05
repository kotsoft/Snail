var blockSize = 48;
var staticBlocks = [];
var blocksX = 100;
var blocksY = 8;
var width = blockSize * blocksY;
var height = blockSize * blocksY;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canvas;
var ctx;
$(function() {
  canvas = $('#gameCanvas')[0];
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  for (var x = 0; x < blocksX; x++) {
    staticBlocks.push([0,0,0,0,0,0,'B','A']);
  }

  function render() {
    drawBackground();
    drawMap();
    
  }

  loadBlockImages(function(err) {
    if (err) return console.error(err);
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();
  });
})

function loadBlockImages(callback) {
  var funcs = [];
  for (var key in blocks) {
    funcs.push(getImage(key, blocks[key]));
  }

  (function next() {
    var fn = funcs.shift();
    fn(function(err, key, img) {
      if (err) {
        console.error(err);
      } else {
        blocks[key] = img;
      }
      if (funcs.length) {
        next();
      } else {
        callback();
      }
    });
  })();
}

function getImage(key, url) {
  return function(callback) {
    var img = new Image();
    img.src = 'img/' + url + '.png';
    img.onload = function() {
      callback(null, key, img);
    };
    img.onerror = callback;
  };
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);
}

function drawMap() {
  for (var x = 0; x < blocksX; x++) {
    for (var y = 0; y < blocksY; y++) {
      var block = blocks[staticBlocks[x][y]];
      if (block) {
        var imgX = x * blockSize;
        var imgY = y * blockSize;
        ctx.drawImage(block, imgX, imgY);
      }
    }
  }
}
