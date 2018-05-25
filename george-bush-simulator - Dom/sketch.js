let triviaQuestions = [
  ["Rarely is the question asked, is our _____?", "Children Learning?", "Flag the coolest?", "Our country great?", "Neighbors sneaking?", 1, 0, 0, 0],
  ["Our enemies are innovative and resourceful, and so are we. They never stop thinking about new ways to harm our country and our people, _____.", "And frankly that’s just plain old unacceptable.", "But their leader isn’t nearly as handsome. ", "And neither do we.", "And they must be stopped.", 0, 0, 1, 0],
  ["It's time for the human race to _____.", "Band together", "Enter the solar system.", "Evolve", "Beat Cancer", 0, 1, 0, 0],
  ["I have made good judgments in the past. _____.", "I will made good judgments in the future.", "But I also made mistakes.", "I have made good judgments in the future.", "But once in a while I made great ones.", 0, 0, 1, 0],
  ["It isn't pollution that's harming the environment,_____.", "It’s the democrats.", "It’s cold outside.", "It’s the Arabs.", "It’s the impurities in our air and water that are doing it.", 0, 0, 0, 1],
  ["I know the human being and _____ can coexist peacefully.", "Fish", "Cow", "Arabs", "Technology", 1, 0, 0, 0],
  ["Africa is a ____ that suffers from incredible disease", "Country", "People", "Nation", "City", 0, 0, 1, 0],
];

let speeches = [
  "I believe God wants me to be president. I was chosen by the grace of God to lead at that moment. God told me to strike at al-Qaeda and I struck them, and then he instructed me to strike at Saddam, which I did, and now I am determined to solve the problem in the Middle East."
];

// Images
let menuBackground;
let angryBush; // radBush > gladBush > sadBush > angryBush
let sadBush;
let gladBush;
let radBush;
let talkingBush; //Typing game background

// Gifs
let talkingGif;

// Classes
let myTrivia;
let myMenu;
let myTypingGame;

// State variables
let state = 0; //state 0 = menu, state 1 = trivia, state 2 = typing
let triviaState = 0; //state 0 = question, state 1 = feedback/next question menu
let typingState = 0; //state 0 = game, state 1 = end screen

//Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

function preload() {
  menuBackground = loadImage("images/startScreen.png");
  angryBush = loadImage("images/angryBush.png");
  sadBush = loadImage("images/sadBush.png");
  gladBush = loadImage("images/gladBush.png");
  radBush = loadImage("images/radBush.png");
  talkingBush = [loadImage("images/BushTalkParts/bushTalk1.png"), loadImage("images/BushTalkParts/bushTalk2.png")];
}

function setup() {
  createCanvas(640, 640);
  myTrivia = new Trivia;
  myTypingGame = new TypingGame;
  myMenu = new Menu;

  // Animations
  talkingGif = new Gif(200, talkingBush);

}

function draw() {
  background(225);
  // Menu
  if (state === 0) {
    myMenu.displayBackground();
    myMenu.displayStartButton();
    myMenu.isMouseOverButton();
  }

  // Trivia
  if (state === 1) {
    myTrivia.isMouseOverButton();
    if (triviaState === 0) {
      myTrivia.displayButtons();
      myTrivia.displayQuestion();
      myTrivia.displayLives();
    }

    if (triviaState === 1) {
      myTrivia.displayChoice();
      myTrivia.isMouseOverButton();
    }
  }

  // Typing game
  if (state === 2) {
    if (typingState === 0) {
      myTypingGame.displayBackground();
      myTypingGame.displayPhrase();
      myTypingGame.displayLives();
      myTypingGame.displayTimer();
    }

    else if (typingState === 1) {
      myTypingGame.displayEndScreen();
      myTypingGame.isMouseOverButton();
    }
  }

}




class Gif {
  constructor(timePerImage, image) {
    this.gifSpeed = timePerImage;
    this.gif = image;
    this.gifLength = image.length - 1;
    this.currentImage = 0;
    this.gifTimer = new Timer(this.gifSpeed);
  }

  displayGif() {
    image(this.gif[this.currentImage], 0, 0);
    this.gifTimer.timerIsDone = this.gifTimer.isDone();
    if (this.gifTimer.timerIsDone && this.currentImage < this.gifLength) {
      this.currentImage += 1;
      this.gifTimer.reset(this.gifSpeed);
    }
    else if (this.gifTimer.timerIsDone) {
      this.currentImage = 0;
      this.gifTimer.reset(this.gifSpeed);
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
    this.triviaMaxLevel = triviaQuestions.length - 1;
    // Counts how many correct answers you got in a row
    this.georgeBushHappiness = 0; //0 = angry, 1 = sad, 2 = glad, 3 = rad
    // Life count
    this.lives = 3;
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
    text(triviaQuestions[this.triviaLevel][4], 480, 580, this.buttonWidth, this.buttonHeight);
  }

  isMouseOverButton() {
    if (triviaState === 0) {
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
    else if (triviaState === 1) {
      // Next Question button
      if (mouseX >= 320 - this.buttonWidth / 2 && mouseX <= 320 + this.buttonWidth / 2 &&
        mouseY >= 500 - this.buttonHeight / 2 && mouseY <= 500 + this.buttonHeight / 2) {
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

  displayLives() {
    textAlign(LEFT, TOP);
    textSize(24);
    text("Lives:" + this.lives, 0, 0);
  }

  displayChoice() {
    // Determines which george bush to show
    imageMode(CORNER);
    if (this.georgeBushHappiness === 0) {
      image(angryBush, 0, 0, 640, 640);
    }
    else if (this.georgeBushHappiness === 1) {
      image(sadBush, 0, 0, 640, 640);
    }
    else if (this.georgeBushHappiness === 2) {
      image(gladBush, 0, 0, 640, 640);
    }
    else {
      image(radBush, 0, 0, 640, 640);
    }

    // Determines whether to display correct or incorrect
    fill(0);
    textAlign(CENTER, CENTER);
    if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 1) {
      text("Correct!", width / 2, 425);
    }
    else {
      text("Incorrect!", width / 2, 425);
    }

    // Next Question Button
    rectMode(CENTER);
    fill(0, 0, 255, 200);
    if (this.mouseOverNextQuestion) {
      fill(0, 0, 200, 250);
    }
    rect(320, 500, this.buttonWidth, this.buttonHeight);
    fill(0);
    text("Next Question", 320, 500);
  }

  changeHappiness() {
    if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 1) {
      this.georgeBushHappiness += 1;
    }
    else if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 0) {
      this.lives -= 1;
      this.georgeBushHappiness = 0;
    }
  }
}









class TypingGame {
  constructor() {
    this.speechLevel = 0;
    this.lives = 15;
    this.phrase = speeches[this.speechLevel];
    this.firstLetter = this.phrase[0];
    this.win = false;

    this.buttonWidth = 300;
    this.buttonHeight = 80;
    this.mouseOverButton = false;

    this.timeRemaining;
    this.typingTimer = new Timer;
  }

  removeLetters() {
    this.phrase = this.phrase.substr(1);
    this.firstLetter = this.phrase[0];
    if (this.phrase.length === 0) {
      this.win = true;
      typingState = 1;
    }
  }

  removeLife() {
    if (state === 2 && typingState === 0) {
      if (this.lives > 1) {
        this.lives -= 1;
      }
      else {
        typingState = 1;
      }
    }
  }

  createTimer(waitTime) {
    this.typingTimer.reset(waitTime);
  }

  displayTimer() {
    this.timeRemaining = (this.typingTimer.waitTime - (millis() - this.typingTimer.startTime)) / 1000;
    textAlign(RIGHT, BOTTOM);
    textSize(48);
    text("Time left: " + floor(this.timeRemaining), width, height);

    if (this.timeRemaining < 1) {
      typingState = 1;
    }
  }

  displayLives() {
    textSize(48);
    textAlign(LEFT, BOTTOM);
    text("Lives: " + this.lives, 0, height);
  }

  displayPhrase() {
    textSize(28);
    rectMode(CORNER);
    textAlign(LEFT, TOP);
    text(this.phrase, 0, 0, width, height / 2);
  }

  displayBackground() {
    imageMode(CORNER);
    talkingGif.displayGif();
  }

  displayEndScreen() {
    if (this.win) {
      // Next Game Button
      textAlign(CENTER, CENTER);
      textSize(32);
      rectMode(CENTER);
      fill(0, 0, 255, 200);
      if (this.mouseOverButton) {
        fill(0, 0, 200, 250);
      }
      rect(320, 500, this.buttonWidth, this.buttonHeight);
      fill(0);
      text("Continue", 320, 500);
    }

    else {
      // Try Again Button
      textAlign(CENTER, CENTER);
      textSize(32);
      rectMode(CENTER);
      fill(0, 0, 255, 200);
      if (this.mouseOverButton) {
        fill(0, 0, 200, 250);
      }
      rect(320, 500, this.buttonWidth, this.buttonHeight);
      fill(0);
      text("Try Again", 320, 500);
    }
  }

  isMouseOverButton() {
    if (mouseX >= 320 - this.buttonWidth / 2 && mouseX <= 320 + this.buttonWidth / 2 &&
      mouseY >= 500 - this.buttonHeight / 2 && mouseY <= 500 + this.buttonHeight / 2) {
      this.mouseOverButton = true;
    }
    else {
      this.mouseOverButton = false;
    }
  }
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









class Timer {
  constructor(waitTime) {
    this.waitTime = waitTime;
    this.startTime = millis();
    this.finishTime = this.startTime + this.waitTime;
    this.timerIsDone = false;
  }

  reset(newWaitTime) {
    this.waitTime = newWaitTime;
    this.startTime = millis();
    this.finishTime = this.startTime + this.waitTime;
    this.timerIsDone = false;
  }

  isDone() {
    if (millis() >= this.finishTime) {
      return true;
    }
    else {
      return false;
    }
  }
}









function mousePressed() {
  // Makes buttons clickable in trivia game
  if (state === 1 && triviaState === 0) {
    if (myTrivia.mouseOverButtonOne) {
      myTrivia.buttonChoice = 1;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.mouseOverButtonTwo) {
      myTrivia.buttonChoice = 2;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.mouseOverButtonThree) {
      myTrivia.buttonChoice = 3;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.mouseOverButtonFour) {
      myTrivia.buttonChoice = 4;
      myTrivia.changeHappiness();
      triviaState = 1;
    }
  }

  else if (state === 1 && triviaState === 1) {
    if (myTrivia.mouseOverNextQuestion) {
      if (myTrivia.triviaLevel < myTrivia.triviaMaxLevel) {
        myTrivia.triviaLevel += 1;
      }
      else if (myTrivia.lives > 0) {
        state = 2;
      }
      triviaState = 0;
    }
  }

  // Button on end screen of typing game
  if (state === 2 && typingState === 1) {
    if (myTypingGame.mouseOverButton) {
      if (myTypingGame.win) {
        state = 0;
      }
      else {
        myTypingGame.createTimer(90000);
        myTypingGame.lives = 15;
        myTypingGame.phrase = speeches[0];
        typingState = 0;
        myTypingGame.firstLetter = this.phrase[0];

      }
    }
  }

  // Makes button clickable on menu
  if (state === 0) {
    if (myMenu.mouseOverButton) {
      state = 1;
      myTypingGame.createTimer(90000);
    }
  }
}









function keyPressed() {
  // Typing game
  // Checks if the key pressed is equal to the first letter in the phrase
  if (key === myTypingGame.firstLetter.toUpperCase() || key === myTypingGame.firstLetter.toLowerCase()) {
    myTypingGame.removeLetters();
  }

  // Punctuation doesn't work with the same logic, so it uses keycodes instead
  else if (keyCode === 190 && myTypingGame.firstLetter === ".") {
    myTypingGame.removeLetters();
  }

  else if (keyCode === 188 && myTypingGame.firstLetter === ",") {
    myTypingGame.removeLetters();
  }

  else if (keyCode === 191 && myTypingGame.firstLetter === "?") {
    myTypingGame.removeLetters();
  }

  else if (keyCode === 189 && myTypingGame.firstLetter === "-") {
    myTypingGame.removeLetters();
  }

  // Removes a life if the wrong button is pressed
  else {
    myTypingGame.removeLife();
  }
}
