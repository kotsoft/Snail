SNAIL.player = {
  moveLeft: false,
  moveRight: false,
  jump: false,
  init: function(x, y) {
    this.x = this.xprev = x;
    this.y = this.yprev = y;

    // Make canvas for both the shell and body so that they
    // can be individually transformed.
    var shellImg = SNAIL.images['snail-body-shl-prpl'];
    this.shellCanvas = document.createElement('canvas');
    this.shellCanvas.width = SNAIL.blockWidth;
    this.shellCanvas.height = SNAIL.blockHeight;
    this.shellCtx = this.shellCanvas.getContext('2d');
    this.shellCtx.drawImage(shellImg, 0, 0);

    var bodyImg = SNAIL.images['snail-body-blu'];
    this.bodyCanvas = document.createElement('canvas');
    this.bodyCanvas.width = SNAIL.blockWidth;
    this.bodyCanvas.height = SNAIL.blockHeight;
    this.bodyCtx = this.bodyCanvas.getContext('2d');
    this.bodyCtx.drawImage(bodyImg, 0, 0);
  },
  update: function(dt){
    var dx = this.x - this.xprev;
    if (this.moveLeft) {
      dx -= .8;
    }
    if (this.moveRight) {
      dx += .8;
    }
    if (dx > 10) {
      dx = 10;
    } else if (dx < -10) {
      dx = -10;
    }
    dx *= .9;
    var dy = this.y - this.yprev + SNAIL.gravity;
    this.xprev = this.x;
    this.yprev = this.y;
    this.x += dx;
    this.y += dy;
    var newPos = SNAIL.staticCollision(this.x, this.y, dx, dy);
    this.x = newPos[0];
    if (this.jump && newPos[1] < this.y) {
      this.y = this.yprev - 15;
    } else {
      this.y = newPos[1];
    }
  },
  draw: function(time, x,y) {
    var ctx = SNAIL.ctx;
    ctx.drawImage(this.bodyCanvas, x, y);
    ctx.drawImage(this.shellCanvas, x, y);
  },
}
