const canvas = document.getElementById("myCanvas")
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,50);
car.draw(ctx);

animate(); // call once to keep the animate loop running

function animate(){
  car.update();
  canvas.height = window.innerHeight; // clear canvas for animation loop
  car.draw(ctx);
  requestAnimationFrame(animate); //keep looping by calling the animate()
}