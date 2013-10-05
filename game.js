var blockSize = 48;
var staticBlocks = [];

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(function() {
  var canvas = $('#gameCanvas')[0];
  var ctx = canvas.getContext('2d');

  for (var x = 0; x < 100; x++) {
    staticBlocks.push([0,0,0,0,0,0,0,1]);
  }

  function render() {
    
  }

  (function animloop(){
    requestAnimFrame(animloop);
    render();
  })();
})