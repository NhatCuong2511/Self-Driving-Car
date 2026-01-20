class Road {
  constructor (x, width, lane = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = lane;
    //define left and right curb location
    this.left = x - width/2; 
    this.right = x + width/2;

    const infinite = 1000000;
    this.top = -infinite;
    this.bottom = infinite;
  }


  draw(ctx){
    ctx.lineWidth = 100;
    ctx.strokeStyle = "white";

    for(let i = 0; i <= this.laneCount; i++){
      const x = lerp( // linear interpolation to find
        this.left,
        this.right,
        i/this.laneCount
      );
      
      //draw dashes
      if(i > 0 && i < this.laneCount) {
        ctx.setLineDash([20,20]);
      } else {
        ctx.setLineDash([])
      }
      //draw lanes
      ctx.beginPath();
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
      }

      
    }
}