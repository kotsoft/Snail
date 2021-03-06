SNAIL.player = {
  moveLeft: false,
  moveRight: false,
  jump: false,
  distance: 0,
  state: 'normal',
  setToNormal: 0,
  init: function(x, y) {
    this.x = this.xprev = x;
    this.y = this.yprev = y;
    this.shellImg = SNAIL.images['snail-body-shl-prpl'];
    this.bodyImgs = {};
    this.bodyImgs.sad = [
      SNAIL.images['snail-body-pnk'],
      SNAIL.images['snail-body-pnk-squish']
    ];
    this.bodyImgs.happy = [
      SNAIL.images['snail-body-yel'],
      SNAIL.images['snail-body-yel-squish']
    ];
    this.bodyImgs.normal = [
      SNAIL.images['snail-body-blu'],
      SNAIL.images['snail-body-blu-squish']
    ];
  },
  update: function(dt, time){
    var dx = this.dx = this.x - this.xprev;
    if (this.moveLeft) {
      dx -= 1;
      this.moveTime++;
      this.distance += dx;
    } else if (this.moveRight) {
      dx += 1;
      this.moveTime++;
      this.distance += dx;
    } else {
      this.moveTime = 0;
    }

    if (dx > 10) {
      dx = 10;
    } else if (dx < -10) {
      dx = -10;
    }
    dx *= .85;

    if (dx < 0) {
      this.faceLeft = true;
    } else if (dx > 0) {
      this.faceLeft = false;
    }

    var dy = this.dy = this.y - this.yprev + SNAIL.gravity;
    this.xprev = this.x;
    this.yprev = this.y;
    this.x += dx;
    this.y += dy;
    var newPos = SNAIL.staticCollision(this.x, this.y, dx, dy, true);
    this.x = newPos[0];
    if (this.jump && newPos[1] < this.y) {
      this.y = this.yprev - 16;
    } else {
      this.y = newPos[1];
    }
  },
  draw: function(time, x, y) {
    var ctx = SNAIL.ctx;

    // Choose a different body img depending on the state.
    var bodyImgs = this.bodyImgs[this.state];

    // If state is not `normal`, set it to `normal` in some time.
    if (this.state !== 'normal') {
      this.setToNormal++;
      if (this.setToNormal === 30) {
        this.setToNormal = 0;
        this.state = 'normal';
      }
    }
    var bodyImg = (!this.moveLeft && !this.moveRight) &&
      this.dx === 0 || this.moveTime % 26 < 13
      ? bodyImgs[0] : bodyImgs[1];
    if (this.faceLeft) {
      ctx.save();
      ctx.scale(-1, 1);
      x = -x - SNAIL.blockWidth;
      ctx.drawImage(bodyImg, x, y);
      this.drawShell(time, x, y);
      ctx.restore();
    } else {
      ctx.drawImage(bodyImg, x, y);
      this.drawShell(time, x, y);
    }
  },
  drawShell: function(time, x, y) {
    time *= -0.01;
    var ctx = SNAIL.ctx;
    ctx.save();
    ctx.translate(x + 22,y + 26);
    var scale = 1.1 + Math.cos(time * 0.2) * 0.1;
    ctx.scale(scale, scale);
    ctx.rotate(time);
    ctx.drawImage(this.shellImg, -20, -28);
    ctx.restore();
  },
}
