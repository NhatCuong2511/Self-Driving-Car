const canvas = document.getElementById("myCanvas")
canvas.width = 200;
//canvas.height = window.innerHeight

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9) // (center of the canvas, whole canvas width)
const car = new Car(road.getLaneCenter(1),100,30,50,"KEYS",3);
const traffic = [
  new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

animate(); // call once to keep the animate loop running

function animate(){
  for(let i=0; i<traffic.length;i++){
    traffic[i].update(road.borders,[]);
  }
  car.update(road.borders,traffic); // call this.sensor.update() inside car.update()
  canvas.height = window.innerHeight; // clear canvas for animation loop
  
  ctx.save();
  ctx.translate(0,-car.y+canvas.height*0.7)

  road.draw(ctx); // draw road first b4 the car

  for(let i=0; i< traffic.length;i++){
    traffic[i].draw(ctx,"red")
  }
  car.draw(ctx,"blue"); 

  ctx.restore();
  requestAnimationFrame(animate); //keep looping by calling animate()
  
}