let myTrivia;

//Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

function setup() {
  createCanvas(640, 640);
  myTrivia = new Trivia;
}

function draw() {
  background(200);

  // Trivia game
  myTrivia.displayButtons();
  myTrivia.isMouseOverButton();
}

class Trivia {
  constructor() {
    this.buttonWidth = 300;
    this.buttonHeight = 80;
    this.mouseOverButtonOne = false;
    this.mouseOverButtonTwo = false;
    this.mouseOverButtonThree = false;
    this.mouseOverButtonFour = false;
    this.textSize = 24;
  }

  displayButtons() {
    rectMode(CENTER);
    textSize(this.textSize);
    textAlign(CENTER, CENTER);

    // Top left button == buttonOne
    fill(0, 0, 255);
    if (this.mouseOverButtonOne) {
      fill(0, 0, 200);
    }
    rect(160, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("example", 160, 480);

    // Top right button == buttonTwo
    fill(0, 0, 255);
    if (this.mouseOverButtonTwo) {
      fill(0, 0, 200);
    }
    rect(480, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("example", 480, 480);

    // Bottom left button == buttonThree
    fill(0, 0, 255);
    if (this.mouseOverButtonThree) {
      fill(0, 0, 200);
    }
    rect(160, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("example", 160, 580);

    // Bottom right button == ButtonFour
    fill(0, 0, 255);
    if (this.mouseOverButtonFour) {
      fill(0, 0, 200);
    }
    rect(480, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("example", 480, 580);
  }

  isMouseOverButton() {
    // Button one
    if (mouseX <= 160 - this.buttonWidth / 2 || mouseX >= 160 + this.buttonWidth / 2 ||
      mouseY <= 480 - this.buttonHeight / 2 || mouseY >= 480 + this.buttonHeight / 2) {
      this.mouseOverButtonOne = true;
    }
    else {
      this.mouseOverButtonOne = false;
    }

    // Button two
    if (mouseX <= 480 - this.buttonWidth / 2 || mouseX >= 480 + this.buttonWidth / 2 ||
      mouseY <= 480 - this.buttonHeight / 2 || mouseY >= 480 + this.buttonHeight / 2) {
      this.mouseOverButtonTwo = true;
    }
    else {
      this.mouseOverButtonTwo = false;
    }

    // Button three
    if (mouseX <= 160 - this.buttonWidth / 2 || mouseX >= 160 + this.buttonWidth / 2 ||
      mouseY <= 580 - this.buttonHeight / 2 || mouseY >= 580 + this.buttonHeight / 2) {
      this.mouseOverButtonThree = true;
    }
    else {
      this.mouseOverButtonThree = false;
    }

    // Button four
    if (mouseX <= 480 - this.buttonWidth / 2 || mouseX >= 480 + this.buttonWidth / 2 ||
      mouseY <= 580 - this.buttonHeight / 2 || mouseY >= 580 + this.buttonHeight / 2) {
      this.mouseOverButtonFour = true;
    }
    else {
      this.mouseOverButtonFour = false;
    }
  }

  displayQuestion() {

  }
}

function mousePressed() {

}
