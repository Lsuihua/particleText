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
          if (this.textData[opacityIndex] > 0) {
              this.particleList.push(new Particle({
                  x,
                  y,
                  r:3,
                  color: '#fff'
              }));
          }
      }
    }
  }

  change(options){
    if(options.color){
      this.color = options.color;
    }
    this.text = options.text;
    if(options.step){
      this.step = options.step;
    }
  }

  update(){
    this.init();
  }

  render(){
    for(let partic of this.particleList){
      partic.update();
      partic.draw();
    }
  }

  animate(){
    var self = this;
    self.ctx.clearRect(0,0,self.width,self.height);
    this.update();
    this.render();
    requestAnimationFrame(this.animate.bind(self));
  }
}