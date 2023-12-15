//let size = 100;
let xSkip = 4;
let ySkip = 8;
let t = "";

function preload() {
  font = loadFont("AnonymousPro-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  frameRate(30);
  
  textSize(8);
  fill(255)
  textFont(font);
}

function draw() {
  background(0);
  text(t, 0, 0);
  
  ascii(capture, false);
}

function ascii(img, smooth) {
  const s1 = "@%#*+=-. ";
  const s2 = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^` ";
  let asciiText = "";
  let s;
  if (smooth) {
    s = s2;
  } else {
    s = s1;
  }
  
  img.loadPixels();
  for (let i=0; i < (img.pixels.length / 4); i+=xSkip) {
    const realIndex = ((i*4));
    const pixel = [
      img.pixels[realIndex  ],
      img.pixels[realIndex+1],
      img.pixels[realIndex+2],
      img.pixels[realIndex+3]
    ];
    
    const level = (pixel[0]/255 + pixel[1]/255 + pixel[2]/255)/3;
    let c = s[floor(s.length - (s.length * level))];
    asciiText = asciiText + c;
    
    if (i % (img.width) == 0) {
      asciiText = asciiText + "\n";
      i+=img.width*ySkip;
    }
  }
  t = asciiText;
}