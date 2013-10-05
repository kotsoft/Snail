function Animal(type) {
  this.ctx = SNAIL.ctx;
  this.eyesClosedImg = SNAIL.images[type + '-eyes-closed'];
  this.eyesOpenImg = SNAIL.images[type + '-eyes-open'];
  this.bodyImgs = [];
  for (var i = 0; i < 3; i++) {
    this.bodyImgs[i] = SNAIL.images[type + '-tail-' + (i + 1)];
  }
  
  this.blinking = false;
  this.wordComplete = false;
}

Animal.prototype.draw = function(time, x, y) {
  var i = ~~(time * 0.002) % (this.bodyImgs.length * 2 - 1);
  if (i >= this.bodyImgs.length) {
    i = this.bodyImgs.length - (i - this.bodyImgs.length) - 1;
  }
  var bodyImg = this.bodyImgs[i];

  var maybeBlink = ~~(time * 0.002) % 6 === 0;
  this.blinking = maybeBlink && ~~(time * 0.01) % 3 === 0;

  var eyesImg = this.blinking ? this.eyesClosedImg : this.eyesOpenImg;
  this.ctx.drawImage(bodyImg, x, y);
  this.ctx.drawImage(eyesImg, x, y);
};
