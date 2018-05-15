let triviaQuestions = [
  ["Rarely is the question asked, is our _____?", "Children Learning?", "Flag the coolest?", "Our country great?", "Neighbors sneaking?", 4, 2, 1, 3],
  ["Our enemies are innovative and resourceful, and so are we. They never stop thinking about new ways to harm our country and our people, _____.", "And neither do we.", "But their leader isn’t nearly as handsome. ", "And frankly that’s just plain old unacceptable.", "And they must be stopped.", 4, 2, 3, 1],
  [],
];

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

  myTrivia.isMouseOverButton();
  // Trivia game
  if (triviaState === 1) {
    myTrivia.displayButtons();
    myTrivia.displayQuestion();
  }

  if (triviaState === 2) {
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
    this.mouseOverNextQuestion = false;
    this.buttonTextSize = 24;
    this.buttonChoice = 0;
    // question variables
    this.questionWidth = 620;
    this.questionHeight = 120;
    this.questionx = width / 2;
    this.questiony = 360;
    // chooses the question
    this.triviaLevel = 0;
  }

  displayButtons() {
    rectMode(CENTER);
    textSize(this.buttonTextSize);
    textAlign(CENTER, CENTER);

    // Top left button == buttonOne
    fill(175, 0, 0);
    if (this.mouseOverButtonOne) {
      fill(255, 0, 0);
    }
    rect(160, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text(triviaQuestions[this.triviaLevel][1], 160, 480);

    // Top right button == buttonTwo
    fill(175, 0, 0);
    if (this.mouseOverButtonTwo) {
      fill(255, 0, 0);
    }
    rect(480, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    text(triviaQuestions[this.triviaLevel][2], 480, 480);

    // Bottom left button == buttonThree
    fill(175, 0, 0);
    if (this.mouseOverButtonThree) {
      fill(255, 0, 0);
    }
    rect(160, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text(triviaQuestions[this.triviaLevel][3], 160, 580);

    // Bottom right button == ButtonFour
    fill(175, 0, 0);
    if (this.mouseOverButtonFour) {
      fill(255, 0, 0);
    }
    rect(480, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    text(triviaQuestions[this.triviaLevel][4], 480, 580);
  }

  isMouseOverButton() {
    if (triviaState === 1){
      // Button one
      if (mouseX >= 160 - this.buttonWidth / 2 && mouseX <= 160 + this.buttonWidth / 2 &&
        mouseY >= 480 - this.buttonHeight / 2 && mouseY <= 480 + this.buttonHeight / 2) {
        this.mouseOverButtonOne = true;
      }
      else {
        this.mouseOverButtonOne = false;
      }

      // Button two
      if (mouseX >= 480 - this.buttonWidth / 2 && mouseX <= 480 + this.buttonWidth / 2 &&
        mouseY >= 480 - this.buttonHeight / 2 && mouseY <= 480 + this.buttonHeight / 2) {
        this.mouseOverButtonTwo = true;
      }
      else {
        this.mouseOverButtonTwo = false;
      }

      // Button three
      if (mouseX >= 160 - this.buttonWidth / 2 && mouseX <= 160 + this.buttonWidth / 2 &&
        mouseY >= 580 - this.buttonHeight / 2 && mouseY <= 580 + this.buttonHeight / 2) {
        this.mouseOverButtonThree = true;
      }
      else {
        this.mouseOverButtonThree = false;
      }

      // Button four
      if (mouseX >= 480 - this.buttonWidth / 2 && mouseX <= 480 + this.buttonWidth / 2 &&
        mouseY >= 580 - this.buttonHeight / 2 && mouseY <= 580 + this.buttonHeight / 2) {
        this.mouseOverButtonFour = true;
      }
      else {
        this.mouseOverButtonFour = false;
      }
    }
    else if (triviaState === 2){
      // Next Question button
      if (mouseX >= 320 - this.buttonWidth / 2 && mouseX <= 320 + this.buttonWidth / 2 &&
        mouseY >= 400 - this.buttonHeight / 2 && mouseY <= 400 + this.buttonHeight / 2) {
        this.mouseOverNextQuestion = true;
      }
      else {
        this.mouseOverNextQuestion = false;
      }
    }
  }

  displayQuestion() {
    rectMode(CENTER);
    fill(175, 0, 0);
    rect(this.questionx, this.questiony, this.questionWidth, this.questionHeight);

    rectMode(CORNER);
    textAlign(LEFT, TOP);
    fill(0);
    text(triviaQuestions[this.triviaLevel][0], this.questionx - this.questionWidth / 2 + 4, this.questiony - this.questionHeight / 2, this.questionWidth, this.questionHeight);
  }

  displayChoice() {
    fill(0);
    textAlign(CENTER,CENTER);
    text(triviaQuestions[this.triviaLevel][4 + this.buttonChoice], width / 2, height / 2);

    // Next Question Button
    rectMode(CENTER);
    fill(175, 0, 0);
    if (this.mouseOverNextQuestion) {
      fill(255, 0, 0);
    }
    rect(320, 400, this.buttonWidth, this.buttonHeight);

    fill(0);
    text("Next Question", 320, 400);
  }
}

function mousePressed() {
  // Makes buttons clickable
  if (state === 1 && gameState === 1 && triviaState === 1) {
    if (myTrivia.mouseOverButtonOne) {
      myTrivia.buttonChoice = 1;
      triviaState = 2;
    }

    if (myTrivia.mouseOverButtonTwo) {
      myTrivia.buttonChoice = 2;
      triviaState = 2;
    }

    if (myTrivia.mouseOverButtonThree) {
      myTrivia.buttonChoice = 3;
      triviaState = 2;
    }

    if (myTrivia.mouseOverButtonFour) {
      myTrivia.buttonChoice = 4;
      triviaState = 2;
    }
  }
  else if (state === 1 && gameState === 1 && triviaState === 2) {
    if (myTrivia.mouseOverNextQuestion) {
      myTrivia.triviaLevel += 1;
      triviaState = 1;
    }
  }
}
