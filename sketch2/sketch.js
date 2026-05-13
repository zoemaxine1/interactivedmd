// Zoe Manalo
// Code assisted by ChatGPT 5.5 (OpenAI). Prompts that directly influenced this sketch:
// “Help me make small glowing orb that forms in bottom right ”
// “help make orb click into sketch 3”
// generated with p5.js

let myFont;

let orbX;
let orbY;
let orbSize = 40;

function preload() {
  myFont = loadFont("Acidic.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(40);
  textFont(myFont);

  // orb position
  orbX = width - 250;
  orbY = height - 200;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  orbX = width - 250;
  orbY = height - 200;
}

function draw() {

  background(0, 25);

  // moving text
  fill(random(255), random(255), random(255));
  text('before', mouseX, mouseY);

  // orb
  drawLightOrb(orbX, orbY);

  // hover cursor
  if (dist(mouseX, mouseY, orbX, orbY) < orbSize) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

}

function mousePressed() {

  // GO TO SKETCH 3
  if (dist(mouseX, mouseY, orbX, orbY) < orbSize) {

    window.location.href = "../sketch3/index.html";

  }

}

// orb
function drawLightOrb(x, y) {

  noStroke();

  let scale = 0.5;
  let pulse = sin(frameCount * 0.08) * 10 * scale;

  // glow
  for (let i = 60; i > 0; i -= 5) {

    fill(255, 255, 200, 8);

    ellipse(
      x,
      y,
      (i * 3 * scale) + pulse
    );

  }

  // core
  fill(255, 255, 180);

  ellipse(
    x,
    y,
    (20 * scale) + pulse
  );

}