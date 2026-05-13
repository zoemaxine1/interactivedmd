// Zoe Manalo
// Code assisted by ChatGPT 5.5 (OpenAI). Prompts that directly influenced this sketch:
// “Help me make small glowing orb that forms in bottom right ”
// “help make orb click into sketch 3”
// "help me add small twinkling stars throughout sketch"
// generated with p5.js

let myFont;

let orbX;
let orbY;
let orbSize = 40;

let stars = [];

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

  // create stars
  for (let i = 0; i < 120; i++) {

    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(40, 180),
      speed: random(0.01, 0.05),
      offset: random(TWO_PI)
    });

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  orbX = width - 250;
  orbY = height - 200;
}

function draw() {

  background(0, 25);

  // stars
  drawStars();

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

// stars
function drawStars() {

  noStroke();

  for (let s of stars) {

    let twinkle =
      sin(frameCount * s.speed + s.offset);

    let a =
      map(twinkle, -1, 1, 20, s.alpha);

    fill(255, a);

    ellipse(
      s.x,
      s.y,
      s.size
    );

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