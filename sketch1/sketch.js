// sketch.js

// zoe manalo
// code from madi reyes "Po" with my changes noted

var font;
var points = [];
var b = [];
var bbox;
var offsetX = 0;
var offsetY = 0;

var collapse = false;
var collapseCenter;
var scatterStarted = false;
var scatterTimer = 0;

function preload() {
  font = loadFont("Acidic.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  makeText();

  collapseCenter = createVector(width / 2, height / 2);
}

function makeText() {

  points = [];
  b = [];

  let fontSize = min(windowWidth * 0.12, 180);

  bbox = font.textBounds("THE CALM", 0, 0, fontSize);

  offsetX = bbox.w / 2;
  offsetY = bbox.h / 2;

  points = font.textToPoints(
    "THE CALM",
    width / 2 - offsetX,
    height / 2 + offsetY,
    fontSize,
    {
      sampleFactor: 0.29,
      simplifyThreshold: 0
    }
  );

  for (let i = 0; i < points.length; i++) {
    b[i] = new Ball(points[i].x, points[i].y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  collapseCenter = createVector(width / 2, height / 2);

  if (!collapse) {
    makeText();
  }
}

function draw() {
  background(130, 220, 250);

  for (let i = 0; i < b.length; i++) {
    b[i].move();
    b[i].bounce();
    b[i].display();
  }

  // wait before compacting
  if (scatterStarted && !collapse) {
    scatterTimer++;

    if (scatterTimer > 375) {
      collapse = true;
    }
  }

  // cursor
  if (collapse && allBallsCompact()) {
    cursor(HAND);

    fill(255, 245, 180);

    textFont(font);
    textAlign(CENTER);
    textSize(18);

    text(collapseCenter.x, collapseCenter.y + 45);

  } else {
    cursor(ARROW);
  }
}

function mousePressed() {

  // GO TO SKETCH 2
  if (collapse && allBallsCompact()) {
    window.location.href = "../sketch2/index.html";
  }

}

function allBallsCompact() {

  for (let i = 0; i < b.length; i++) {

    if (
      dist(
        b[i].x,
        b[i].y,
        collapseCenter.x,
        collapseCenter.y
      ) > 35
    ) {
      return false;
    }

  }

  return true;
}

class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
  }

  move() {

    if (!collapse) {

      if (dist(mouseX, mouseY, this.x, this.y) < 120) {

        this.xspeed = random(-2, 2);
        this.yspeed = random(-2, 2);

        scatterStarted = true;
      }

      this.x += this.xspeed;
      this.y += this.yspeed;

    } else {

      // compact swoosh
      this.x = lerp(
        this.x,
        collapseCenter.x + random(-10, 10),
        0.28
      );

      this.y = lerp(
        this.y,
        collapseCenter.y + random(-10, 10),
        0.28
      );
    }
  }

  bounce() {

    if (!collapse) {

      if (this.x > width || this.x < 0) {
        this.xspeed *= -1;
      }

      if (this.y > height || this.y < 0) {
        this.yspeed *= -1;
      }

    }

  }

  display() {

    fill(255, 245, 180);
    noStroke();

    if (collapse) {

      // vibrating compact ball
      let shakeX = random(-2, 2);
      let shakeY = random(-2, 2);

      ellipse(this.x + shakeX, this.y + shakeY, 10, 10);

    } else {

      ellipse(this.x, this.y, 8, 8);

    }

  }
}