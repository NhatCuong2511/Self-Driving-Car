class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.sensor = new Sensor(this); // passing car to this sensor

    this.controls = new Controls();
  }

  update() {
    this.#move();
    this.sensor.update();
  };

  //private method move();
  #move(){
    if(this.controls.forward) {
        this.speed+=this.acceleration-this.friction
      }
      if(this.controls.reverse) {
        this.speed-=this.acceleration
      }
      //flip the car direction if moving backward
      if (this.speed !=0) {
      const flip = this.speed>0?1:-1;
        if(this.controls.left) {
          this.angle+=0.03*flip;
        }
        if(this.controls.right) {
          this.angle-=0.03*flip;
        }
    }

    if (this.speed > this.maxSpeed) { // set max speed moving forward
        this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed) { // set max speed moving backward
        this.speed = -this.maxSpeed/2;
    }

    //add friction and logic to stop car
    if(this.speed > 0) this.speed-=this.friction; 
    if(this.speed < 0) this.speed+=this.friction;
    if(Math.abs(this.speed) < this.friction) this.speed = 0;
    
    this.x-=Math.sin(this.angle)*this.speed
    this.y-=Math.cos(this.angle)*this.speed// when car moves forward, it go up so smaller y value
  }

  draw(ctx) {  
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
    );
    ctx.fill();

    ctx.restore();

    this.sensor.draw(ctx);
  }
}

