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
  "example", "I believe God wants me to be president. I was chosen by the grace of God to lead at that moment. God told me to strike at al-Qaeda and I struck them, and then he instructed me to strike at Saddam, which I did, and now I am determined to solve the problem in the Middle East."
];

// Images
let menuBackground;
let angryBush; // radBush > gladBush > sadBush > angryBush
let sadBush;
let gladBush;
let radBush;
let talkingBush; //Typing game background
let shoeThrowHit; //Typing game possible end screen

// Gifs
let talkingGif;
let shoeHit;

// Classes
let myTrivia;
let myMenu;
let myTypingGame;
let myEatingGame;

// State variables
let state = 0; //state 0 = menu, state 1 = trivia, state 2 = typing, state 3 = eating game
let triviaState = 0; //state 0 = question, state 1 = feedback/next question menu
let typingState = 0; //state 0 = game, state 1 = end screen
let eatingState = 0; //state 0 = game

//Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

function preload() {
  menuBackground = loadImage("images/startScreen.png");
  angryBush = loadImage("images/angryBush.png");
  sadBush = loadImage("images/sadBush.png");
  gladBush = loadImage("images/gladBush.png");
  radBush = loadImage("images/radBush.png");
  talkingBush = [loadImage("images/BushTalkParts/bushTalk1.png"), loadImage("images/BushTalkParts/bushTalk2.png")];
  shoeThrowHit = [loadImage("images/ShoedParts/Shoe1.png"), loadImage("images/ShoedParts/Shoe2.png"), loadImage("images/ShoedParts/Shoe3.png"),
    loadImage("images/ShoedParts/Shoe4.png"), loadImage("images/ShoedParts/Shoe5.png"), loadImage("images/ShoedParts/Shoe6.png"),
    loadImage("images/ShoedParts/Shoe7.png"), loadImage("images/ShoedParts/Shoe8.png"), loadImage("images/ShoedParts/Shoe9.png"),
    loadImage("images/ShoedParts/Shoe10.png"), loadImage("images/ShoedParts/Shoe11.png"), loadImage("images/ShoedParts/Shoe11.png"),
    loadImage("images/ShoedParts/Shoe11.png"), loadImage("images/ShoedParts/Shoe11.png"),
  ];
}

function setup() {
  createCanvas(640, 640);
  myTrivia = new Trivia;
  myTypingGame = new TypingGame;
  myMenu = new Menu;
  myEatingGame = new EatingGame;

  // Animations
  talkingGif = new Gif(200, talkingBush);
  shoeHit = new Gif(60, shoeThrowHit);
}

function draw() {
  background(225);
  // Menu
  if (state === 0) {
    myMenu.displayMenu();
  }

  // Trivia
  if (state === 1) {
    if (triviaState === 0) {
      myTrivia.displayButtons();
      myTrivia.displayQuestion();
      myTrivia.displayLives();
    }

    if (triviaState === 1) {
      myTrivia.displayChoice();
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
    }
  }

  // Eating game
  if (state === 3) {
    if (eatingState === 0) {
      myEatingGame.controlGame();
      myEatingGame.displayFallingArrows();
      myEatingGame.displayTracks();
    }
  }
}

class Button {
  constructor(x, y, width, height, string) {
    this.buttonX = x;
    this.buttonY = y;
    this.buttonWidth = width;
    this.buttonHeight = height;
    this.buttonText = string;
    this.mouseOverButton = false;
  }

  displayButton() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    fill(0);
    text(this.buttonText, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
  }

  isMouseOverButton() {
    if (mouseX < this.buttonX + this.buttonWidth / 2 && mouseX > this.buttonX - this.buttonWidth / 2 &&
      mouseY < this.buttonY + this.buttonHeight / 2 && mouseY > this.buttonY - this.buttonHeight / 2) {
      this.mouseOverButton = true;
    }

    else {
      this.mouseOverButton = false;
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
    this.buttonTextSize = 24;
    this.buttonChoice = 0;

    // Button between questions
    this.nextQuestionButton = new Button(320, 500, 300, 80, "Continue");

    // Trivia buttons
    this.buttonOne = new Button(160, 480, 300, 80, triviaQuestions[0][1]);
    this.buttonTwo = new Button(480, 480, 300, 80, triviaQuestions[0][2]);
    this.buttonThree = new Button(160, 580, 300, 80, triviaQuestions[0][3]);
    this.buttonFour = new Button(480, 580, 300, 80, triviaQuestions[0][4]);

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
    this.buttonOne.isMouseOverButton();
    this.buttonTwo.isMouseOverButton();
    this.buttonThree.isMouseOverButton();
    this.buttonFour.isMouseOverButton();

    this.buttonOne.buttonText = triviaQuestions[this.triviaLevel][1];
    this.buttonTwo.buttonText = triviaQuestions[this.triviaLevel][2];
    this.buttonThree.buttonText = triviaQuestions[this.triviaLevel][3];
    this.buttonFour.buttonText = triviaQuestions[this.triviaLevel][4];

    // Top left button == buttonOne
    fill(175, 0, 0);
    if (this.buttonOne.mouseOverButton) {
      fill(255, 0, 0);
    }
    // Makes the text fit in button
    textSize(this.buttonTextSize);
    if (this.buttonOne.buttonText.length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    this.buttonOne.displayButton();

    // Top right button == buttonTwo
    fill(175, 0, 0);
    if (this.buttonTwo.mouseOverButton) {
      fill(255, 0, 0);
    }
    // Makes the text fit in button
    textSize(this.buttonTextSize);
    if (this.buttonTwo.buttonText.length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    this.buttonTwo.displayButton();

    // Bottom left button == buttonThree
    fill(175, 0, 0);
    if (this.buttonThree.mouseOverButton) {
      fill(255, 0, 0);
    }
    // Makes the text fit in button
    textSize(this.buttonTextSize);
    if (this.buttonThree.buttonText.length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    this.buttonThree.displayButton();

    // Bottom right button == ButtonFour
    fill(175, 0, 0);
    if (this.buttonFour.mouseOverButton) {
      fill(255, 0, 0);
    }
    // Makes the text fit in button
    textSize(this.buttonTextSize);
    if (this.buttonFour.buttonText.length >= 25) {
      textSize(this.buttonTextSize - 4);
    }
    this.buttonFour.displayButton();
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
    this.nextQuestionButton.isMouseOverButton();
    fill(0, 0, 255, 200);
    if (this.nextQuestionButton.mouseOverButton) {
      fill(0, 0, 200, 250);
    }
    this.nextQuestionButton.displayButton();
  }

  changeHappiness() {
    if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 1) {
      this.georgeBushHappiness += 1;
    }
    else if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 0 && this.lives > 1) {
      this.lives -= 1;
      this.georgeBushHappiness = 0;
    }
    else if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 0) {
      this.lives = 3;
      this.georgeBushHappiness = 0;
      this.triviaLevel = 0;
      this.nextQuestionButton.buttonText = "Try Again";
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

    this.typingButton = new Button(320, 160, 300, 80, "Try Again");

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
    textSize(36);
    text("Time left: " + floor(this.timeRemaining), width, height - 240);

    if (this.timeRemaining < 1) {
      typingState = 1;
    }
  }

  displayLives() {
    textSize(36);
    textAlign(LEFT, BOTTOM);
    text("Lives: " + this.lives, 0, height - 240);
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
    imageMode(CORNER);
    textSize(32);
    shoeHit.displayGif();
    if (this.win) {
      this.typingButton.buttonText = "Continue";
    }

    else {
      this.typingButton.buttonText = "Try Again";
    }
    fill(0, 0, 255, 200);
    if (this.typingButton.mouseOverButton) {
      fill(0, 0, 200, 250);
    }
    this.typingButton.isMouseOverButton();
    this.typingButton.displayButton();
  }
}

class EatingGame {
  constructor() {
    // track variables
    this.trackSize = 64;
    this.trackX = 320;
    this.trackY = 480;

    // empty array
    this.arrowArray = [];

    // arrow speed
    this.arrowSpeed = 3;

    // Length and speed of game
    this.amountOfArrows = 20;
    this.spawnRate = 750;

    // timer
    this.eatingTimer = new Timer(this.spawnRate);
  }

  displayTracks() {
    // Draws vertical lines
    for (let i = 0; i < 5; i++) {
      line(this.trackX + this.trackSize * i, 0, this.trackX + this.trackSize * i, height);
    }

    // Draws horizontal lines
    for (let i = 0; i < 2; i++) {
      line(this.trackX, this.trackY + this.trackSize * i, width - this.trackSize, this.trackY + this.trackSize * i);
    }

    // Draws left arrow
    fill(0, 50);
    triangle(320,512,384,480,384,544);
    // Draws up arrow
    triangle(384,544,448,544,416,480);
    // Draws down arrow
    triangle(448,480,512,480,480,544);
    // Draws right arrow
    triangle(576,512,512,480,512,544);
  }

  createArrow() {
    this.arrowArray.push(new Arrow(floor(random(4)), this.arrowSpeed));
  }

  displayFallingArrows() {
    for (let i = 0; i < this.arrowArray.length; i++) {
      this.arrowArray[i].displayArrow();
    }
  }

  controlGame() {
    this.eatingTimer.timerIsDone = this.eatingTimer.isDone();
    if (this.eatingTimer.timerIsDone){
      this.createArrow();
      this.eatingTimer.reset(this.spawnRate);
    }
  }
}

class Arrow {
  constructor(key, speed){
    this.arrowSize = 64;
    this.arrowDir = key; // 0 = left, 1 = up, 2 = down, 3 = down

    this.speed = speed;
    this.y = 0;
  }

  displayArrow() {
    rectMode(CORNER);
    // Makes different tracks drop different colours
    if (this.arrowDir === 0){
      fill(255,0,0);
    }

    else if (this.arrowDir === 1){
      fill(255,0,255);
    }

    else if (this.arrowDir === 2){
      fill(0,0,255);
    }

    else if (this.arrowDir === 3){
      fill(0,255,0);
    }

    rect(myEatingGame.trackX + myEatingGame.trackSize * this.arrowDir, this.y, myEatingGame.trackSize, myEatingGame.trackSize);
    this.y += this.speed;
  }
}

class Menu {
  constructor() {
    // Creates button
    this.menuButton = new Button(430, 200, 300, 150, "Start Game");
  }

  displayMenu() {
    image(menuBackground, 0, 0);
    this.menuButton.isMouseOverButton();

    textSize(48);
    fill(0, 0, 255);
    if (this.menuButton.mouseOverButton) {
      fill(0, 0, 200);
    }

    this.menuButton.displayButton();
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
    if (myTrivia.buttonOne.mouseOverButton) {
      myTrivia.buttonChoice = 1;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.buttonTwo.mouseOverButton) {
      myTrivia.buttonChoice = 2;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.buttonThree.mouseOverButton) {
      myTrivia.buttonChoice = 3;
      myTrivia.changeHappiness();
      triviaState = 1;
    }

    if (myTrivia.buttonFour.mouseOverButton) {
      myTrivia.buttonChoice = 4;
      myTrivia.changeHappiness();
      triviaState = 1;
    }
  }

  // Next question button for trivia
  else if (state === 1 && triviaState === 1) {
    if (myTrivia.nextQuestionButton.mouseOverButton) {
      if (myTrivia.triviaLevel < myTrivia.triviaMaxLevel) {
        myTrivia.triviaLevel += 1;
      }
      else if (myTrivia.lives > 0) {
        state = 2;
        myTypingGame.createTimer(90000);
      }
      triviaState = 0;
    }
  }

  // Button on end screen of typing game
  if (state === 2 && typingState === 1) {
    if (myTypingGame.typingButton.mouseOverButton) {
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
    if (myMenu.menuButton.mouseOverButton) {
      state = 3;
      myTypingGame.createTimer(90000);
      myEatingGame.createArrow();
      myEatingGame.eatingTimer.reset(myEatingGame.spawnRate);
    }
  }
}

function keyPressed() {
  // Typing game
  // Checks if the key pressed is equal to the first letter in the phrase
  if (state === 2){
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

  //Eating game
  if (state === 3){
    if (keyCode === LEFT_ARROW){
      // Left arrow === 0
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        if(myEatingGame.arrowArray[i].arrowDir === 0
        && myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32
        && myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32){
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
    }

    if (keyCode === UP_ARROW){
      // Up arrow === 1
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        if (myEatingGame.arrowArray[i].arrowDir === 1
        && myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32
        && myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32){
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
    }

    if (keyCode === DOWN_ARROW){
      // Down Arrow === 2
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        if (myEatingGame.arrowArray[i].arrowDir === 2
        && myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32
        && myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32){
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
    }

    if (keyCode === RIGHT_ARROW){
      // Right arrow === 3
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        if(myEatingGame.arrowArray[i].arrowDir === 3
        && myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32
        && myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32){
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
    }
  }
}
