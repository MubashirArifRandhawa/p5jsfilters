let img;
let w = 80;
let matrix;
let matrixSize = 5;
const CIRCLE_RADIUS = 100;
function preload() {
  img = createImage(400, 400);
}

function setup() {
  document.querySelector("#title").textContent = "Circle Scaling Down(Task 5)";
  document.querySelector("#info").textContent =
    "Width of a circle : " + CIRCLE_RADIUS * 2 + " to width : " + CIRCLE_RADIUS;
  createCanvas(window.innerWidth, window.innerHeight);
  loadPixels();
  // pixelDensity(1) for not scaling pixel density to display density
  pixelDensity(1);

  noLoop();
}

function draw() {
  background(255);

  createCircle(100);

  scaleDown(100);
}

function createCircle(r) {
  img.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let loc = (x + y * img.width) * 4;
      const distance = dist(x, y, r * 2, r * 2);

      if (Math.floor(distance) < r * 2) {
        img.pixels[loc] = red(0);
        img.pixels[loc + 1] = green(0);
        img.pixels[loc + 2] = blue(0);
        img.pixels[loc + 3] = alpha(255);
      }
    }
  }
  img.updatePixels();
  image(img, 40, 50);
}
function scaleDown(size) {
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let loc = (x + y * img.width) * 4;
      const distance = dist(x, y, size, size);

      if (Math.floor(distance) < size) {
        img.pixels[loc] = red(0);
        img.pixels[loc + 1] = green(0);
        img.pixels[loc + 2] = blue(0);
        img.pixels[loc + 3] = alpha(255);
      } else {
        img.pixels[loc] = red(255);
        img.pixels[loc + 1] = green(255);
        img.pixels[loc + 2] = blue(255);
        img.pixels[loc + 3] = alpha(255);
      }
    }
  }

  img.updatePixels();
  image(img, window.innerWidth / 2, 50);
}
