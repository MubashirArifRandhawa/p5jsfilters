let img;
let w = 80;
let matrix;
let matrixSize = 5;
function preload() {
  img = createImage(400, 400);
}

function setup() {
  document.querySelector("#title").textContent = "Circle (Task 4)";
  createCanvas(window.innerWidth, window.innerHeight);
  loadPixels();
  // pixelDensity(1) for not scaling pixel density to display density
  pixelDensity(1);

  noLoop();
}

function draw() {
  background(255);

  createCircle(100);
}

function createCircle(r) {
  img.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let loc = (x + y * img.width) * 4;
      const distance = dist(x, y, r * 2, r * 2);

      if (distance < r * 2) {
        img.pixels[loc] = red(0);
        img.pixels[loc + 1] = green(0);
        img.pixels[loc + 2] = blue(0);
        img.pixels[loc + 3] = alpha(255);
      }
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}
