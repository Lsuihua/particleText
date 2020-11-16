class Particle{
  constructor(options){
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.r = options.r || 4;
    this.color = options.color || '#fff';
  }

  draw(){
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    game.ctx.fill();
    game.ctx.closePath();
  }

  update(){
    // this.x = this.x + Math.random() * 6 - 3;
    // this.y = this.y + Math.random() * 6 - 3;
    // this.r = 3 + 2 * Math.sin(new Date() / 1000 % 1000 * this.r);
  }
}