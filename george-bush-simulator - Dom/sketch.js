let myTrivia;
let state = 1;
let gameState = 1;
let triviaState = 1;
//Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

function setup() {
  createCanvas(640, 640);
  myTrivia = new Trivia;
}

function draw() {
  background(200);

  // Trivia game
  if (triviaState === 1){
    myTrivia.displayButtons();
    myTrivia.displayQuestion();
    myTrivia.isMouseOverButton();
  }

  if (triviaState === 2){
    myTrivia.displayChoice();
  }
}

class Trivia {
  constructor() {
    // button variables
    this.buttonWidth = 300;
    this.buttonHeight = 80;
    this.mouseOverButtonOne = false;
    this.mouseOverButtonTwo = false;
    this.mouseOverButtonThree = false;
    this.mouseOverButtonFour = false;
    this.buttonTextSize = 24;
    this.buttonChoice;

    // question variables
    this.questionWidth = 620;
    this.questionHeight = 120;
    this.questionx = width / 2;
    this.questiony = 360;
  }

  displayButtons() {
    rectMode(CENTER);
    textSize(this.buttonTextSize);
    textAlign(CENTER, CENTER);

    // Top left button == buttonOne
    fill(255, 0, 0);
    if (this.mouseOverButtonOne) {
      fill(175, 0, 0);
    }
    rect(160, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("Button One", 160, 480);

    // Top right button == buttonTwo
    fill(255, 0, 0);
    if (this.mouseOverButtonTwo) {
      fill(175, 0, 0);
    }
    rect(480, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("Button Two", 480, 480);

    // Bottom left button == buttonThree
    fill(255, 0, 0);
    if (this.mouseOverButtonThree) {
      fill(175, 0, 0);
    }
    rect(160, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("Button Three", 160, 580);

    // Bottom right button == ButtonFour
    fill(255, 0, 0);
    if (this.mouseOverButtonFour) {
      fill(175, 0, 0);
    }
    rect(480, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("Button Four", 480, 580);
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
    if (mouseX >= 160 - this.buttonWidth / 2 || mouseX <= 160 + this.buttonWidth / 2 ||
      mouseY >= 580 - this.buttonHeight / 2 || mouseY <= 580 + this.buttonHeight / 2) {
      this.mouseOverButtonThree = true;
    }
    else {
      this.mouseOverButtonThree = false;
    }

    // Button four
    if (mouseX >= 480 - this.buttonWidth / 2 || mouseX <= 480 + this.buttonWidth / 2 ||
      mouseY >= 580 - this.buttonHeight / 2 || mouseY <= 580 + this.buttonHeight / 2) {
      this.mouseOverButtonFour = true;
    }
    else {
      this.mouseOverButtonFour = false;
    }
  }

  displayQuestion() {
    rectMode(CENTER);
    fill(175, 0, 0);
    rect(this.questionx, this.questiony, this.questionWidth, this.questionHeight);
  }

  displayChoice(){
    fill(0);
    text("You pressed button " + this.buttonChoice, width/2, height/2);
  }
}

function mousePressed() {
  // Makes buttons clickable
  if (state === 1 && gameState === 1 && triviaState === 1) {
    if (myTrivia.mouseOverButtonOne) {
      triviaState = 2;
      myTrivia.buttonChoice = 1;
      myTrivia.displayChoice();
    }

    if (myTrivia.mouseOverButtonTwo) {
      triviaState = 2;
      myTrivia.buttonChoice = 2;
      myTrivia.displayChoice();
    }

    if (myTrivia.mouseOverButtonThree) {
      triviaState = 2;
      myTrivia.buttonChoice = 3;
      myTrivia.displayChoice();
    }

    if (myTrivia.mouseOverButtonFour) {
      triviaState = 2;
      myTrivia.buttonChoice = 4;
      myTrivia.displayChoice();
    }
  }
}
