let img;
let w = 80;
let matrix;
let matrixSize = 5;
function preload() {
  img = loadImage("../lena.png");
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  // pixelDensity(1) for not scaling pixel density to display density
  pixelDensity(1);
  matrix = getMatrix(matrixSize);
  for (let x = 0; x < img.width - 1; x++) {
    for (let y = 0; y < img.height - 1; y++) {
      let c = convolution(x, y, matrix, matrixSize, img);
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + y * img.width) * 4;
      let r = img.pixels[loc];
      let g = img.pixels[loc + 1];
      let b = img.pixels[loc + 2];

      let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      img.pixels[loc] = red(bright);
      img.pixels[loc + 1] = green(bright);
      img.pixels[loc + 2] = blue(bright);
      img.pixels[loc + 3] = alpha(bright);
    }
  }
  noLoop();
}

function draw() {
  background(img);
  loadPixels();
  for (let x = 0; x < img.width - 1; x++) {
    for (let y = 0; y < img.height - 1; y++) {
      let c = convolution(x, y, matrix, matrixSize, img);
      // retrieve the RGBA values from c and update pixels()
      let loc = (x + y * img.width) * 4;
      pixels[loc] = red(c);
      pixels[loc + 1] = green(c);
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}
//This will implement matrix given to it, to the image and return the red, green, blue value (*alpha is not changed in it)
function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {
      // What pixel are we testing
      const xloc = x + i - offset;
      const yloc = y + j - offset;
      let loc = (xloc + img.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0, img.pixels.length - 1);
      //  let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      rtotal += img.pixels[loc] * matrix[i][j];
      gtotal += img.pixels[loc + 1] * matrix[i][j];
      btotal += img.pixels[loc + 2] * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);

  // Return the resulting color
  return color(rtotal, gtotal, btotal);
}
function getMatrix(size) {
  let arr = [];
  if (size % 2 != 1) {
    alert("Filter size should be an odd number");
  } else if (size > 5) {
    alert("Filter size cannot be greater than 5");
  } else if (size == 3) {
    arr = [
      [1 / 16, 2 / 16, 1 / 16],
      [2 / 16, 4 / 16, 2 / 16],
      [1 / 16, 2 / 16, 1 / 16],
    ];
  } else if (size == 5) {
    arr = [
      [2 / 159, 4 / 159, 5 / 159, 4 / 159, 2 / 159],
      [4 / 159, 9 / 159, 12 / 159, 9 / 159, 4 / 159],
      [5 / 159, 12 / 159, 15 / 159, 12 / 159, 5 / 159],
      [4 / 159, 9 / 159, 12 / 159, 9 / 159, 4 / 159],
      [2 / 159, 4 / 159, 5 / 159, 4 / 159, 2 / 159],
    ];
  }
  return arr;
}
