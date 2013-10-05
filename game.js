var blockSize = 48;
var blocksX = SNAIL.numBlocksWidth;
var blocksY = SNAIL.numBlocksHeight;
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

  var player = SNAIL.player;//Player();

  for (var x = 0; x < blocksX; x++) {
    if (x % 4 == 0) {
      SNAIL.staticBlocks.push(['C','A','E','P',0,0,'B','A']);
    } else {
      SNAIL.staticBlocks.push(['C','A','E','P',0,0,0,'A']);
    }
  }

  // function render() {
  //   drawBackground();
  //   drawMap();
    
  // }

  loadBlockImages(function(err) {
    if (err) return console.error(err);
    // (function animloop(){
    //   requestAnimFrame(animloop);
    //   render();
    // })();
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
    img.src = 'images/' + url + '.png';
    img.onload = function() {
      callback(null, key, img);
    };
    img.onerror = callback;
  };
}

SNAIL.drawBackground = function() {
  ctx.clearRect(0, 0, width, height);
}

SNAIL.drawMap = function() {
  for (var x = 0; x < blocksX; x++) {
    for (var y = 0; y < blocksY; y++) {
      var block = blocks[SNAIL.staticBlocks[x][y]];
      if (typeof block == 'object') {
        var imgX = x * blockSize;
        var imgY = y * blockSize;
        ctx.drawImage(block, imgX, imgY);
      }
    }
  }
}
