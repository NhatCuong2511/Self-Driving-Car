const canvas = document.getElementById("myCanvas")
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9) // (center of the canvas, whole canvas width)
const car = new Car(100,100,30,50);
car.draw(ctx);

animate(); // call once to keep the animate loop running

function animate(){
  car.update();
  canvas.height = window.innerHeight; // clear canvas for animation loop
  road.draw(ctx); // draw road first b4 the car
  car.draw(ctx);
  requestAnimationFrame(animate); //keep looping by calling animate()
  
}