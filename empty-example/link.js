//more here: https://happycoding.io/tutorials/p5js/images
let img;
width = 300;
height = 300;

function preload() {
  img = loadImage("https://happycoding.io/images/stanley-1.jpg");
}

function modifyBrightness(delta) {
  // Loop over every pixel in the image
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Read the pixel's color
      let originalColor = img.get(x, y);
      const r = max(0, min(255, delta + red(originalColor)));
      const g = max(0, min(255, delta + green(originalColor)));
      const b = max(0, min(255, delta + blue(originalColor)));
      let outputColor = color(r, g, b);
      // Set the pixel's color
      img.set(x, y, outputColor);
    }
  }
}

function setup() {
  img.loadPixels();
  createCanvas(img.width, img.height);
  modifyBrightness(0);
  img.updatePixels();
}

function draw() {
  image(img, 0, 0);
}
