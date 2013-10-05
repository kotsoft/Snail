SNAIL.player = {
  moveLeft: false,
  moveRight: false,
  jump: false,
  init: function(x, y) {
    this.x = this.xprev = x;
    this.y = this.yprev = y;
    console.log(SNAIL.images);
    var shellImg = SNAIL.images['snail-body-shl-prpl'];
    var bodyImg = SNAIL.images['snail-body-blu'];
    this.canvas = document.createElement('canvas');
    this.canvas.width = SNAIL.blockWidth;
    this.canvas.height = SNAIL.blockHeight;
    var ctx = this.canvas.getContext('2d');
    ctx.drawImage(shellImg, 0, 0);
    ctx.drawImage(bodyImg, 0, 0);
  },
  update: function(dt){
    var dx = this.x - this.xprev;
    if (this.moveLeft) {
      dx -= .5;
    }
    if (this.moveRight) {
      dx += .5;
    }
    if (dx > 10) {
      dx = 10;
    } else if (dx < -10) {
      dx = -10;
    }
    dx *= .9;
    var dy = this.y - this.yprev + 0.5;
    this.xprev = this.x;
    this.yprev = this.y;
    this.x += dx;
    this.y += dy;
    var newPos = SNAIL.staticCollision(this.x, this.y);
    this.x = newPos[0];
    if (this.jump && newPos[1] < this.y) {
      this.y = this.yprev - 10;
    } else {
      this.y = newPos[1];
    }
  },
  draw: function() {
    var ctx = SNAIL.ctx;
    ctx.drawImage(this.canvas, this.x, this.y);
  },
}
