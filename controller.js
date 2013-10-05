var SNAIL = {}; //Main namespace

SNAIL.canvasID = "#gameCanvas";
SNAIL.staticBlocks = [];
SNAIL.lastFrameTime = 0;

SNAIL.blockWidth  = 48;
SNAIL.blockHeight = 48;

SNAIL.numBlocksWidth  = 100;
SNAIL.numBlocksHeight = 50;

SNAIL.canvasRenderWidth  = SNAIL.numBlocksWidth  * SNAIL.blockWidth; 
SNAIL.canvasRenderHeight = SNAIL.numBlocksHeight * SNAIL.blockHeight;

SNAIL.level = 0;
SNAIL.currentText = "";

SNAIL.startGame = function(){
	SNAIL.canvas = $(SNAIL.canvasID)[0];
	SNAIL.ctx = SNAIL.canvas.getContext('2d');

	SNAIL.initEvents();
	SNAIL.initBlocks();
};

SNAIL.initBlocks = function(){
	for (var x = 0; x < 100; x++) {
		SNAIL.staticBlocks.push([0,0,0,0,0,0,0,1]);
	}
};

SNAIL.animloop = function(time){
    SNAIL.render();

    var dt = time - SNAIL.lastFrameTime;
	SNAIL.updateModel(dt);

	SNAIL.lastFrameTime = time;
    requestNextAnimationFrame(SNAIL.animloop);
};

SNAIL.main = function(){
	SNAIL.startGame();
	requestNextAnimationFrame(SNAIL.animloop);
};

window.onload = SNAIL.main;

SNAIL.render = function(){

};

SNAIL.updateModel = function(dt){

};


// *** Game Progress Events *** //
SNAIL.hitLetter = function(letter){

	console.log("Hit letter: " + letter);

	//if(S)

};

SNAIL.staticCollision = function(x, y) {
  var cellX = ~~(x/SNAIL.blockSize);
  var cellY = ~~(y/SNAIL.blockSize);

  for (var i = cellX-1; i < cellX+2; i++) {
    for (var j = cellY-1; j < cellY+2; j++) {
      if (i > -1 && j > -1 && i < SNAIL.numBlocksWidth && j < SNAIL.numBlocksHeight && SNAIL.staticBlocks[i][j]) {
        var vx = x-i*SNAIL.blockSize;
        var vy = y-j*SNAIL.blockSize;
        if (vx > -SNAIL.blockSize && vx < SNAIL.blockSize && vy > -SNAIL.blockSize && vy < SNAIL.blockSize) {
          if (Math.abs(vx) > Math.abs(vy)) {
            if (vx < 0) {
              x -= SNAIL.blockSize+vx;
            } else {
              x += SNAIL.blockSize-vx;
            }
          } else {
            if (vy < 0) {
              y -= SNAIL.blockSize+vy;
            } else {
              y += SNAIL.blockSize-vy;
            }
          }
        }
      }
    }
  }
  return [x, y]
}

// **** EVENTS **** //
SNAIL.mouseState = 'up';

SNAIL.movePlayer = function(direction){
	console.log("Move: " + direction);
};

SNAIL.mouseup = function(x,y){
	SNAIL.mouseState = 'up';
};

SNAIL.mousedown = function(x,y){
	SNAIL.mouseState = 'down';
};

SNAIL.mousemove = function(x,y){

};

SNAIL.initEvents = function(){
	$(document).mouseup(function (e) {
		var offset = $(SNAIL.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		SNAIL.mouseup(x,y);
	});

	$(document).mousedown(function (e) {
		var offset = $(SNAIL.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		SNAIL.mousedown(x,y);
	});

	$(document).mousemove(function (e) {
		var offset = $(SNAIL.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		SNAIL.mousemove(x,y);
	});

	$(document).keydown(function (e) {
		if(e.which == 37){
			SNAIL.movePlayer('left');
		}else if(e.which == 39){
			SNAIL.movePlayer('right');
		}else if(e.which == 38){
			SNAIL.movePlayer('up');
		}else if(e.which == 40){
			SNAIL.movePlayer('down');
		}
	});
};

// Reprinted from Core HTML5 Canvas
// By David Geary
window.requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;


            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();