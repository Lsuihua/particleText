class Game {
  constructor(param){
    this.canvas = document.getElementById(param.canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.backCanvas = document.createElement('canvas');
    this.backCtx = this.backCanvas.getContext('2d');

    this.width = this.canvas.width = this.backCanvas.width = window.innerWidth;
    this.height = this.canvas.height = this.backCanvas.height = window.innerHeight;

    this.color = param.color || '#ffffff';
    this.text = param.text || 'hello world';
    this.fontSize = param.fontSize || 250;
    this.fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';
    this.textData = [];
    this.particleList = [];
    this.step = 8;
    this.dx = Math.floor(Math.random()*10);
    this.dy = Math.floor(Math.random()*10);
  }

  init(){
    // 虚拟画布渲染文字
    if(this.textData.length>0){
      // 重置数据
      this.textData = [];
      this.particleList = [];
      this.backCtx.clearRect(0,0,this.width,this.height);
    }
    
    this.backCtx.beginPath();
    this.backCtx.textAlign = 'center';
    this.backCtx.fillStyle = this.color;
    this.backCtx.font =  'bold ' + this.fontSize + 'px ' + this.fontFamily;
    this.backCtx.fillText(this.text,this.width/2,this.height/2);
    this.backCtx.closePath();

    // 获取离屏数据
    this.textData = this.backCtx.getImageData(0,0,this.width,this.height).data;

    for (var y = 0; y < this.height; y += this.step) {
      for (var x = 0; x < this.width; x += this.step) {
          var opacityIndex = (x + y * this.width) * 4;

          // 屏幕随机开始位子
          var sx = this.width/2,
              sy = this.height -50;
          if (this.textData[opacityIndex] > 0) {
              this.particleList.push(new Particle({
                sx,
                sy,
                cx:sx,
                cy:sy,
                ex:x,
                ey:y,
                r:3,
                color: '#fff'
              }));
          }
      }
    }

    this.animate();
  }

  change(options){
    if(options.color){
      this.color = options.color;
    }
    if(this.text){
      this.text = options.text;
    }
    if(options.step){
      this.step = options.step;
    }
    this.init();
  }

  update(){
    for(let i=0;i<this.particleList.length;i++){
      // 速度随机
      var dx = Math.floor(Math.random()*10),
          dy = Math.floor(Math.random()*6);
      // 计算当前位置
      if(this.particleList[i].ex > this.particleList[i].cx){
        this.particleList[i].cx += dx
      }else if(this.particleList[i].ex < this.particleList[i].cx){
        this.particleList[i].cx -= dx;
      }else if(parseInt(this.particleList[i].ex - this.particleList[i].cx)<5){
        this.particleList[i].cx = this.particleList[i].ex;
      }

      if(this.particleList[i].ey > this.particleList[i].cy){
        this.particleList[i].cy += dy
      }else if(this.particleList[i].ey < this.particleList[i].cy){
        this.particleList[i].cy -= dy;
      }else if(parseInt(this.particleList[i].ey - this.particleList[i].cy)<5){
        this.particleList[i].cy = this.particleList[i].ey;
      }
    }
  }

  render(){
    for(let i=0;i<this.particleList.length;i++){
      var cx = this.particleList[i].cx,
          cy = this.particleList[i].cy;
      this.particleList[i].update({cx,cy});
      this.particleList[i].draw();
    }
  }

  animate(){
    var self = this;
    self.ctx.clearRect(0,0,self.width,self.height);
    self.update();
    self.render();
    requestAnimationFrame(self.animate.bind(self));
  }
}