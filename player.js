function Player() {
  this.x = 0;
  this.y = 0;
  this.velX = 0;
  this.velY = 0;
}

function checkCollision(x, y, grid) {
  var cellX = ~~(x/blockSize);
  var cellY = ~~(y/blockSize);

  for (var i = cellX-1; i < cellX+2; i++) {
    for (var j = cellY-1; j < cellY+2; j++) {
      if (grid[i, j]) {
        var vx = x-i;
        var vy = y-j;
        var fx = 0;
        var fy = 0;
        if (vx < 0) {
          if (vx > -blockSize) {
            //fx = -blockSize-
          }
        }
      }
    }
  }
  return {}
}