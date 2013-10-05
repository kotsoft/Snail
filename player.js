SNAIL.player = {
  init: function(x, y) {
    this.x = this.xprev = x;
    this.y = this.yprev = y;
  },
  update: function(dt){
    var dx = this.x - this.xprev;
    var dy = this.y - this.yprev + .1 * dt*dt;
    this.xprev = this.x;
    this.yprev = this.y;
    this.x += dx;
    this.y += dy;
    var newPos = SNAIL.staticCollision(this.x, this.y);
    this.x = newPos[0];
    this.y = newPos[1];
  }
}