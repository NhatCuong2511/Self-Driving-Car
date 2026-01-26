class Road {
  constructor (x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    //define left and right curb location
    this.left = x - width/2; 
    this.right = x + width/2;

    const infinite = 1000000;
    this.top = -infinite;
    this.bottom = infinite;

    const topLeft = {x:this.left, y:this.top};
    const topRight = {x:this.right, y:this.top};
    const bottomLeft = {x:this.left, y:this.bottom};
    const bottomRight = {x:this.right, y:this.bottom};
    this.border = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ]
  }

  //this.left+laneWidth/2 : move to the center of the first lane
  //laneIndex*laneWidth : shift to the desire lane
  //Math.min(laneIndex, this.laneCount-1) : make sure car always restricted in the lanes spawn
  getLaneCenter(laneIndex) {
    const laneWidth = this.width/this.laneCount;
    return this.left+laneWidth/2+Math.min(laneIndex, this.laneCount-1)*laneWidth
  }


  draw(ctx){
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // draw internal lane dividers
    for(let i = 1; i <= this.laneCount-1; i++){
      // linear interpolation to give equally spaced lanes between left and right border
      const x = lerp( 
        this.left,
        this.right,
        i/this.laneCount
      );
      
      //draw dashes
      ctx.setLineDash([20,20]);
     
      //draw lanes
      ctx.beginPath();
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

      //draw borders 
    ctx.setLineDash([]); // solid border
    this.border.forEach(border=>{ // run twice for 2 borders
      ctx.beginPath();  
      //draw a line from top to bottom                    
      ctx.moveTo(border[0].x, border[0].y) 
      ctx.lineTo(border[1].x, border[1].y) 
      ctx.stroke();
    });
  }
}