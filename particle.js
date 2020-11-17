class Particle{
  constructor(options){
    /**
     * xs | sy 起始坐标 xy
     * cx | cy 当前坐标 xy
     * ex | ey 结束坐标 xy ==> 这个像素在图片文本中的原始位置
     */

    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.cx = options.cx || 0;
    this.cy = options.cy || 0;
    this.ex = options.ex || 0;
    this.ey = options.ey || 0;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    this.r = options.r || 4;
    this.color = options.color || '#fff';
  }

  draw(){
    game.ctx.beginPath();
    game.ctx.fillStyle = this.color;
    game.ctx.arc(this.cx,this.cy,this.r,0,Math.PI*2,false);
    game.ctx.fill();
    game.ctx.closePath();
  }

  update(options){
    if(options){
      this.cx = options.cx;
      this.cy = options.cy
    }
  }
}