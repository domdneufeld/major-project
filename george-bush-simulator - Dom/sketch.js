let triviaQuestions = [
  ["Rarely is the question asked, is our _____?", "Children Learning?", "Flag the coolest?", "Our country great?", "Neighbors sneaking?", 1, 0, 0, 0],
  ["Our enemies are innovative and resourceful, and so are we. They never stop thinking about new ways to harm our country and our people, _____.", "And frankly that’s just plain old unacceptable.", "But their leader isn’t nearly as handsome. ", "And neither do we.", "And they must be stopped.", 0, 0, 1, 0],
  [],
];

// Images
let menuBackground;
let angryBush; // radBush > gladBush > sadBush > angryBush
let sadBush;
let gladBush;
let radBush;

// Classes
let myTrivia;
let myMenu;
let myTypingGame;

let state = 0; //state 0 = menu, state 1 = trivia, state 2 = typing
let triviaState = 1;
//Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

function preload() {
  menuBackground = loadImage("images/startScreen.png");
}

function setup() {
  createCanvas(640, 640);
  myTrivia = new Trivia;
  myTypingGame = new TypingGame;
  myMenu = new Menu;
}

function draw() {
  background(200);
  // Menu
  if (state === 0) {
    myMenu.displayBackground();
    myMenu.displayStartButton();
    myMenu.isMouseOverButton();
  }
  // Trivia
  if (state === 1) {
    myTrivia.isMouseOverButton();
    if (triviaState === 1) {
      myTrivia.displayButtons();
      myTrivia.displayQuestion();
    }

    if (triviaState === 2) {
      myTrivia.displayChoice();
    }
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
    // Counts how many correct answers you got in a row
    this.georgeBushHappiness = 0; //0 = angry, 1 = sad, 2 = glad, 3 = rad
  }

  displayButtons() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Top left button == buttonOne
    fill(175, 0, 0);
    if (this.mouseOverButtonOne) {
      fill(255, 0, 0);
    }
    rect(160, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    // Makes the text smaller if the string is long
    textSize(this.buttonTextSize);
    if (triviaQuestions[this.triviaLevel][1].length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    text(triviaQuestions[this.triviaLevel][1], 160, 480, this.buttonWidth, this.buttonHeight);

    // Top right button == buttonTwo
    fill(175, 0, 0);
    if (this.mouseOverButtonTwo) {
      fill(255, 0, 0);
    }
    rect(480, 480, this.buttonWidth, this.buttonHeight);

    fill(0);
    // Makes the text smaller if the string is long
    textSize(this.buttonTextSize);
    if (triviaQuestions[this.triviaLevel][2].length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    text(triviaQuestions[this.triviaLevel][2], 480, 480, this.buttonWidth, this.buttonHeight);

    // Bottom left button == buttonThree
    fill(175, 0, 0);
    if (this.mouseOverButtonThree) {
      fill(255, 0, 0);
    }
    rect(160, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    // Makes the text smaller if the string is long
    textSize(this.buttonTextSize);
    if (triviaQuestions[this.triviaLevel][3].length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    text(triviaQuestions[this.triviaLevel][3], 160, 580, this.buttonWidth, this.buttonHeight);

    // Bottom right button == ButtonFour
    fill(175, 0, 0);
    if (this.mouseOverButtonFour) {
      fill(255, 0, 0);
    }
    rect(480, 580, this.buttonWidth, this.buttonHeight);

    fill(0);
    // Makes the text smaller if the string is long
    textSize(this.buttonTextSize);
    if (triviaQuestions[this.triviaLevel][4].length >= 20) {
      textSize(this.buttonTextSize - 4);
    }
    text(triviaQuestions[this.triviaLevel][4], 480, 580);
  }

  isMouseOverButton() {
    if (triviaState === 1) {
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
    else if (triviaState === 2) {
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
    textSize(this.buttonTextSize);
    textAlign(LEFT, TOP);
    fill(0);
    text(triviaQuestions[this.triviaLevel][0], this.questionx - this.questionWidth / 2 + 4, this.questiony - this.questionHeight / 2, this.questionWidth, this.questionHeight);
  }

  displayChoice() {
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.georgeBushHappiness, width / 2, height / 2);

    // Next Question Button
    rectMode(CENTER);
    fill(0, 0, 255);
    if (this.mouseOverNextQuestion) {
      fill(0, 0, 200);
    }
    rect(320, 400, this.buttonWidth, this.buttonHeight);
    fill(0);
    text("Next Question", 320, 400);
  }

  changeHappiness(){
    if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 1){
      this.georgeBushHappiness += 1;
    }
    else if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 0 && this.georgeBushHappiness > 0){
      this.georgeBushHappiness -= 1;
    }
  }
}

class TypingGame {

}

class Menu {
  constructor() {
    // Button variables
    this.buttonWidth = 300;
    this.buttonHeight = 150;
    this.mouseOverButton = false;
  }

  displayBackground() {
    image(menuBackground, 0, 0);
  }

  displayStartButton() {
    fill(0, 0, 255);
    if (this.mouseOverButton) {
      fill(0, 0, 200);
    }
    stroke(4);
    rectMode(CENTER);
    rect(430, 200, this.buttonWidth, this.buttonHeight);

    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Start Game", 430, 200);
  }

  isMouseOverButton() {
    if (mouseX >= 430 - this.buttonWidth / 2 && mouseX <= 430 + this.buttonWidth / 2 &&
      mouseY >= 200 - this.buttonHeight / 2 && mouseY <= 200 + this.buttonHeight / 2) {
      this.mouseOverButton = true;
    }
    else {
      this.mouseOverButton = false;
    }
  }
}

function mousePressed() {
  // Makes buttons clickable in trivia game
  if (state === 1 && triviaState === 1) {
    if (myTrivia.mouseOverButtonOne) {
      myTrivia.buttonChoice = 1;
      triviaState = 2;
      myTrivia.changeHappiness();
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
  else if (state === 1 && triviaState === 2) {
    if (myTrivia.mouseOverNextQuestion) {
      myTrivia.triviaLevel += 1;
      triviaState = 1;
    }
  }

  // Makes button clickable on menu
  if (state === 0) {
    if (myMenu.mouseOverButton) {
      state = 1;
    }
  }
}
