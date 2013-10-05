function Player() {
  this.x = this.xprev = 0;
  this.y = this.yprev = 0;
  function update(dt) {
    var dx = x - xprev;
    var dy = y - yprev + .5 * dt;
    xprev = x;
    yprev = y;
    x += dx;
    y += dy;
    var newPos = staticCollision(x, y);
    x = newPos.x;
    y = newPos.y;
  }
}

function staticCollision(x, y, dx, dy) {
  var cellX = ~~(x/blockSize);
  var cellY = ~~(y/blockSize);

  var tempX = x;
  var tempY = y;

  for (var i = cellX-1; i < cellX+2; i++) {
    for (var j = cellY-1; j < cellY+2; j++) {
      console.log(i, j, staticBlocks[i][j]);
      if (staticBlocks[i][j]) {
        var vx = x-i*blockSize;
        var vy = y-j*blockSize;
        console.log(vx + ", " + vy);
        if (vx > -blockSize && vx < blockSize && vy > -blockSize && vy < blockSize) {
          if (Math.abs(vx-dx) > Math.abs(vy-dy)) {
            if (vx < 0) {
              tempX -= blockSize+vx;
            } else {
              tempX += blockSize-vx;
            }
          } else {
            if (vy < 0) {
              tempY -= blockSize+vy;
            } else {
              tempY += blockSize-vy;
            }
          }
        }
        console.log(tempX, tempY);
      }
    }
  }
  return [tempX, tempY]
}