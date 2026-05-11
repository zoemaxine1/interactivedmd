let shapes = [];
let numberOfShapes = 100;
let animateDistance = 50;
let lightning = [];
let clouds = [];
let font;

let word = "The Storm";
let letters = [];
let currentLetter = 0;

// cloud, chatgpt "help "
class Cloud {
  constructor() {
    this.x = random(width);
    this.y = random(50, 200);
    this.size = random(100, 200);
    this.speed = random(0.2, 1);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + 100) this.x = -100;
  }

  show() {
    noStroke();
    fill(50, 50, 60, 180);

    ellipse(this.x, this.y, this.size);
    ellipse(this.x + 40, this.y + 10, this.size * 0.8);
    ellipse(this.x - 40, this.y + 10, this.size * 0.8);
  }
}

// rain
class Shape {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.radius = random(8, 30);
    this.color = color(80, 150, 255, 180);
  }

  animateShape() {
    this.x = lerp(this.x, random(this.x - animateDistance, this.x + animateDistance), 0.01);
    this.y = lerp(this.y, random(this.y - animateDistance, this.y + animateDistance), 4);
  }

  drawShape() {
    fill(this.color);
    noStroke();

    push();
    translate(this.x, this.y);
    scale(this.radius / 20);

    beginShape();
    vertex(0, -8);
    bezierVertex(6, -6, 6, 6, 0, 10);
    bezierVertex(-6, 6, -6, -6, 0, -8);
    endShape(CLOSE);

    pop();
  }
}

// -------- LIGHTNING --------
class Lightning {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 5;
  }

  show() {
    stroke(255);
    strokeWeight(2);

    let x = this.x;
    let y = 0;

    while (y < this.y) {
      let nextX = x + random(-15, 15);
      let nextY = y + random(10, 30);
      line(x, y, nextX, nextY);
      x = nextX;
      y = nextY;
    }

    noStroke();
    fill(255, 255, 255, 50);
    rect(0, 0, width, height);
  }
}

function preload() {
  font = loadFont("Acidic.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(64);
  textAlign(CENTER, CENTER);

  // rain
  for (let i = 0; i < numberOfShapes; i++) {
    shapes.push(new Shape());
  }

  // clouds
  for (let i = 0; i < 6; i++) {
    clouds.push(new Cloud());
  }

  makeLetters();
}

function makeLetters() {
  letters = [];
  let startX = width / 2 - 170;
  let y = height / 2;

  for (let i = 0; i < word.length; i++) {
    letters.push({
      letter: word[i],
      x: startX + i * 40,
      y: y,
      hit: false,
      fallSpeed: 0
    });
  }
}

function draw() {
  background(20, 20, random(20, 60));

  // clouds (background)
  for (let c of clouds) {
    c.move();
    c.show();
  }

  // rain
  for (let s of shapes) {
    s.animateShape();
    s.drawShape();
  }

  // text
  drawLetters();

  // lightning
  for (let i = lightning.length - 1; i >= 0; i--) {
    lightning[i].show();
    lightning[i].life--;

    if (lightning[i].life <= 0) {
      lightning.splice(i, 1);
    }
  }
}

function drawLetters() {
  for (let l of letters) {
    if (l.hit) {
      fill(0);
      l.y += l.fallSpeed;
      l.fallSpeed += 0.2;
    } else {
      fill(255);
    }

    text(l.letter, l.x, l.y);
  }
}

function mousePressed() {
  while (currentLetter < letters.length && letters[currentLetter].letter === " ") {
    currentLetter++;
  }

  if (currentLetter < letters.length) {
    letters[currentLetter].hit = true;
    letters[currentLetter].fallSpeed = 1;

    lightning.push(new Lightning(letters[currentLetter].x, letters[currentLetter].y));

    currentLetter++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  makeLetters();
}