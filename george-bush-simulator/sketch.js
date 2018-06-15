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
  , "One of the hardest parts of my job is to connect Iraq to the war on terror. I think war is a dangerous place. If this were a dictatorship it would be a heck of a lot easier... as long as I am the dictator. Hehehe."
  , "I reads every chance I can gets. It is clearly a budget. Its got lots of numbers in it. It has come to my attention, that air pollution is polluting the air. In my sentences I go where no man has gone before."
];

// sounds
let starSpangledBanner;

// Images
let menuBackground;
let angryBush; // radBush > gladBush > sadBush > angryBush
let sadBush;
let gladBush;
let radBush;
let talkingBush; //Typing game background
let shoeThrowHit; //Typing game possible end screen
let bushEatingPretzel; //eating game background 1
let bushEatingPizza; //eating game background 2
let bushEatingCat; //eating game background 3
let bushChoking;
let bushDodge;
let oilRig;

// Gifs
let talkingGif;
let shoeHit;
let dodgeGif;
let pretzelGif;
let pizzaGif;
let catGif;
let chokeGif;
let oilRigGif;

// Classes
let myTrivia;
let myMenu;
let myTypingGame;
let myEatingGame;

// State variables
let state = 0; //state 0 = menu, state 1 = trivia, state 2 = typing, state 3 = eating game, state 4 = level selector
let triviaState = 0; //state 0 = question, state 1 = feedback/next question menu
let typingState = 0; //state 0 = game, state 1 = end screen
let eatingState = 0; //state 0 = game, state 1 = win/loss screen

// Variable for trivia game: 1 = top left 2 = top right, 3 = bottom left, 4 = bottom right;
let buttonChoice;

// Variable for checking to see if you pressed the key at the wrong time in the eating game
let eatingCheck;

function preload() {
  // Laods sounds
  starSpangledBanner = loadSound("starSpangledJay.mp3");

  // Loads still pictures
  menuBackground = loadImage("images/startScreen.png");
  angryBush = loadImage("images/angryBush.png");
  sadBush = loadImage("images/sadBush.png");
  gladBush = loadImage("images/gladBush.png");
  radBush = loadImage("images/radBush.png");

  // Loads all images in an animation
  talkingBush = [loadImage("images/BushTalkParts/bushTalk1.png"), loadImage("images/BushTalkParts/bushTalk2.png")];
  shoeThrowHit = [loadImage("images/ShoedParts/Shoe1.png"), loadImage("images/ShoedParts/Shoe2.png"), loadImage("images/ShoedParts/Shoe3.png"),
    loadImage("images/ShoedParts/Shoe4.png"), loadImage("images/ShoedParts/Shoe5.png"), loadImage("images/ShoedParts/Shoe6.png"),
    loadImage("images/ShoedParts/Shoe7.png"), loadImage("images/ShoedParts/Shoe8.png"), loadImage("images/ShoedParts/Shoe9.png"),
    loadImage("images/ShoedParts/Shoe10.png"), loadImage("images/ShoedParts/Shoe11.png"), loadImage("images/ShoedParts/Shoe11.png"),
    loadImage("images/ShoedParts/Shoe11.png"), loadImage("images/ShoedParts/Shoe11.png"),
  ];
  bushDodge = [loadImage("images/Dodge/Dodge1.png"), loadImage("images/Dodge/Dodge2.png"), loadImage("images/Dodge/Dodge3.png"),
    loadImage("images/Dodge/Dodge4.png"), loadImage("images/Dodge/Dodge5.png"), loadImage("images/Dodge/Dodge6.png"), loadImage("images/Dodge/Dodge7.png"),
    loadImage("images/Dodge/Dodge8.png"), loadImage("images/Dodge/Dodge9.png"), loadImage("images/Dodge/Dodge10.png"), loadImage("images/Dodge/Dodge11.png"),
    loadImage("images/Dodge/Dodge12.png"), loadImage("images/Dodge/Dodge13.png"), loadImage("images/Dodge/Dodge14.png"), loadImage("images/Dodge/Dodge15.png"),
    loadImage("images/Dodge/Dodge16.png"), loadImage("images/Dodge/Dodge17.png"), loadImage("images/Dodge/Dodge17.png"), loadImage("images/Dodge/Dodge17.png")
  ];
  bushEatingCat = [loadImage("images/bushCat/bushcat1.png"), loadImage("images/bushCat/bushcat2.png")];
  bushEatingPretzel = [loadImage("images/bushPretzel/pretzel1.png"), loadImage("images/bushPretzel/pretzel2.png")];
  bushEatingPizza = [loadImage("images/bushPizza/pizza1.png"), loadImage("images/bushPizza/pizza2.png")];
  bushChoking = [loadImage("images/bushChoke/choke1.png"), loadImage("images/bushChoke/choke2.png")];
  oilRig = [loadImage("images/oilrig/oilrig1.png"), loadImage("images/oilrig/oilrig2.png")];
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
  dodgeGif = new Gif(60, bushDodge);
  pretzelGif = new Gif(200, bushEatingPretzel);
  pizzaGif = new Gif(200, bushEatingPizza);
  catGif = new Gif(200, bushEatingCat);
  chokeGif = new Gif(300, bushChoking);
  oilRigGif = new Gif(600, oilRig);

  // Plays song
  // starSpangledBanner.play();
}

function draw() {
  background(255);
  // Loops song
  if(!starSpangledBanner.isPlaying()){
    starSpangledBanner.play();
  }
  // Menu
  if (state === 0) {
    myMenu.displayMenu();
  }

  // Trivia
  else if (state === 1) {
    if (triviaState === 0) {
      myTrivia.displayQuestion();
      myTrivia.displayButtons();
      myTrivia.displayLives();
    }

    if (triviaState === 1) {
      myTrivia.displayChoice();
    }
  }

  // Typing game
  else if (state === 2) {
    background(225);
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
  else if (state === 3) {
    background(225);
    if (eatingState === 0) {
      myEatingGame.controlGame();
      myEatingGame.displayBackground();
      myEatingGame.displayFallingArrows();
      myEatingGame.removeAtBottom();
      myEatingGame.displayTimer();
    }
    else if (eatingState === 1) {
      myEatingGame.displayEndScreen();
    }
  }

  // Level Selector
  else if (state === 4) {
    myMenu.displayLevelSelect();
  }
}

class Button {
  constructor(x, y, width, height, string, colour) {
    this.buttonX = x;
    this.buttonY = y;
    this.buttonWidth = width;
    this.buttonHeight = height;
    this.buttonText = string;
    this.mouseOverButton = false;
    // Text colour
    this.colour = colour;
  }

  displayButton() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    fill(this.colour);
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

  displayGif(x, y) {
    image(this.gif[this.currentImage], x, y);
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
    this.nextQuestionButton = new Button(320, 500, 300, 80, "Continue", 255);

    // Trivia buttons
    this.buttonOne = new Button(160, 480, 300, 80, triviaQuestions[0][1], 255);
    this.buttonTwo = new Button(480, 480, 300, 80, triviaQuestions[0][2], 255);
    this.buttonThree = new Button(160, 580, 300, 80, triviaQuestions[0][3], 255);
    this.buttonFour = new Button(480, 580, 300, 80, triviaQuestions[0][4], 255);

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
    // Displays background
    oilRigGif.displayGif(0, -50);

    // Displays
    rectMode(CENTER);
    fill(175, 0, 0);
    rect(this.questionx, this.questiony, this.questionWidth, this.questionHeight);

    rectMode(CORNER);
    textSize(this.buttonTextSize);
    textAlign(LEFT, TOP);
    fill(255);
    text(triviaQuestions[this.triviaLevel][0], this.questionx - this.questionWidth / 2 + 4, this.questiony - this.questionHeight / 2, this.questionWidth, this.questionHeight);
  }

  displayLives() {
    textAlign(LEFT, TOP);
    textSize(24);
    fill(0);
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
      this.nextQuestionButton.buttonText = "Continue";
    }
    else if (triviaQuestions[this.triviaLevel][4 + this.buttonChoice] === 0 && this.lives > 1) {
      this.lives -= 1;
      this.georgeBushHappiness = 0;
      this.nextQuestionButton.buttonText = "Continue";
    }
    else{
      this.lives -= 1;
      this.georgeBushHappiness = 0;
      this.triviaLevel = 0;
      this.nextQuestionButton.buttonText = "Try Again";
    }
  }
}

class TypingGame {
  constructor() {
    this.speechLevel = 0;
    this.maxSpeechLevel = speeches.length;
    this.lives = 15;
    this.phrase = speeches[this.speechLevel];
    this.firstLetter = this.phrase[0];
    this.win = false;

    this.typingButton = new Button(320, 160, 300, 80, "Try Again", 255);

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
    fill(0);
    this.timeRemaining = (this.typingTimer.waitTime - (millis() - this.typingTimer.startTime)) / 1000;
    textAlign(RIGHT, BOTTOM);
    textSize(36);
    text("Time left: " + floor(this.timeRemaining), width, height - 240);

    if (this.timeRemaining < 1) {
      typingState = 1;
    }
  }

  displayLives() {
    fill(0);
    textSize(36);
    textAlign(LEFT, BOTTOM);
    text("Lives: " + this.lives, 0, height - 240);
  }

  displayPhrase() {
    fill(0);
    textSize(28);
    rectMode(CORNER);
    textAlign(LEFT, TOP);
    text(this.phrase, 0, 0, width, height / 2);
  }

  displayBackground() {
    imageMode(CORNER);
    talkingGif.displayGif(0, 0);
  }

  displayEndScreen() {
    imageMode(CORNER);
    textSize(32);
    if (this.win) {
      dodgeGif.displayGif(0, 0);
      this.typingButton.buttonText = "Continue";
    }
    else {
      shoeHit.displayGif(0, 0);
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
    this.level = 0;
    this.maxLevel = 3;
    this.lives;
    this.win = true;

    // track variables
    this.trackSize = 64;
    this.trackX = 320;
    this.trackY = 480;

    // empty array
    this.arrowArray = [];

    // arrow speed
    this.arrowSpeed = [3, 4, 5];

    // Length and speed of game
    this.amountOfArrows = [15, 25, 40];
    this.spawnRate = [1000, 800, 600];

    // timer
    this.spawnTimer = new Timer(this.spawnRate[this.level]);
    this.gameTimer = new Timer(this.spawnRate[this.level] * this.amountOfArrows[this.level]);
    this.timeRemaining;


    // End screen buttonTexts
    this.winButton = new Button(320, 500, 300, 80, "Continue", 255);
    this.lossButton = new Button(480, 320, 300, 80, "Try Again", 255);
  }

  // removes squares once they reach the bottom of the screen
  removeAtBottom() {
    if (this.arrowArray[0].y > height) {
      this.arrowArray.splice(0, 1);
      this.removeLife();
    }
  }

  displayEndScreen() {
    imageMode(CORNER);
    textSize(24);
    if (this.win) {
      image(gladBush, 0, 0);

      this.winButton.isMouseOverButton();
      fill(0, 0, 200, 200);
      if (this.winButton.mouseOverButton) {
        fill(0, 0, 255, 200);
      }

      this.winButton.displayButton();
    }

    else {
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
      triangle(320, 512, 384, 480, 384, 544);
      // Draws up arrow
      triangle(384, 544, 448, 544, 416, 480);
      // Draws down arrow
      triangle(448, 480, 512, 480, 480, 544);
      // Draws right arrow
      triangle(576, 512, 512, 480, 512, 544);
      chokeGif.displayGif(-160, 0);

      this.lossButton.isMouseOverButton();
      fill(0, 0, 200, 200);
      if (this.lossButton.mouseOverButton) {
        fill(0, 0, 255, 200);
      }
      this.lossButton.displayButton();
    }
  }

  removeLife() {
    //Makes sure that you won't have zero lives
    if (this.lives > 1) {
      this.lives -= 1;
    }
    else {
      this.win = false;
      eatingState = 1;
    }
  }

  displayBackground() {
    // Draws the bush eating gif
    if (this.level === 0) {
      pizzaGif.displayGif(-160, 0);
    }

    else if (this.level === 1) {
      catGif.displayGif(-160, 0);
    }

    else if (this.level === 2) {
      pretzelGif.displayGif(-160, 0);
    }
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
    triangle(320, 512, 384, 480, 384, 544);
    // Draws up arrow
    triangle(384, 544, 448, 544, 416, 480);
    // Draws down arrow
    triangle(448, 480, 512, 480, 480, 544);
    // Draws right arrow
    triangle(576, 512, 512, 480, 512, 544);

    // Displays lives
    textAlign(LEFT, BOTTOM);
    textSize(24);
    fill(0);
    text("Lives: " + this.lives, 0, height);
  }

  createArrow() {
    this.arrowArray.push(new Arrow(floor(random(4)), this.arrowSpeed[this.level]));
    this.arrowArray.push(new Arrow(floor(random(4)), this.arrowSpeed[this.level]));
  }

  displayFallingArrows() {
    for (let i = 0; i < this.arrowArray.length; i++) {
      this.arrowArray[i].displayArrow();
    }
  }

  displayTimer() {
    fill(0);
    this.timeRemaining = (this.gameTimer.waitTime - (millis() - this.gameTimer.startTime)) / 1000;
    textAlign(RIGHT, BOTTOM);
    textSize(24);
    text("Time left: " + floor(this.timeRemaining), width / 2, height);
  }

  controlGame() {
    this.spawnTimer.timerIsDone = this.spawnTimer.isDone();
    this.gameTimer.timerIsDone = this.gameTimer.isDone();

    if (this.spawnTimer.timerIsDone) {
      this.createArrow();
      this.spawnTimer.reset(this.spawnRate[this.level]);
    }

    if (this.gameTimer.timerIsDone) {
      eatingState = 1;
      this.win = true;
    }
  }
}

class Arrow {
  constructor(key, speed) {
    this.arrowSize = 64;
    this.arrowDir = key; // 0 = left, 1 = up, 2 = down, 3 = down

    this.speed = speed;
    this.y = 0;
  }

  displayArrow() {
    rectMode(CORNER);
    // Makes different tracks drop different colours
    if (this.arrowDir === 0) {
      fill(255, 0, 0);
    }

    else if (this.arrowDir === 1) {
      fill(255, 0, 255);
    }

    else if (this.arrowDir === 2) {
      fill(0, 0, 255);
    }

    else if (this.arrowDir === 3) {
      fill(0, 255, 0);
    }

    rect(myEatingGame.trackX + myEatingGame.trackSize * this.arrowDir, this.y, myEatingGame.trackSize, myEatingGame.trackSize);
    this.y += this.speed;
  }
}

class Menu {
  constructor() {
    // Creates first menu button button
    this.menuButton = new Button(430, 200, 300, 150, "Select Level", 255);

    // Creates the level buttons
    this.triviaGameButton = new Button(430, 150, 300, 75, "George Bush Knowledge Test", 255);
    this.typingGameButton = new Button(430, 250, 300, 75, "George Bush Speaking Test", 255);
    this.eatingGameButton = new Button(430, 350, 300, 75, "George Bush Eating Test", 255);
  }

  displayMenu() {
    // Start Menu
    image(menuBackground, 0, 0);
    this.menuButton.isMouseOverButton();

    textSize(36);
    fill(0, 0, 255);
    if (this.menuButton.mouseOverButton) {
      fill(0, 0, 200);
    }

    this.menuButton.displayButton();
  }

  displayLevelSelect() {
    // Level select
    this.typingGameButton.isMouseOverButton();
    this.triviaGameButton.isMouseOverButton();
    this.eatingGameButton.isMouseOverButton();

    image(menuBackground, 0, 0);

    textSize(24);
    fill(0, 0, 255);
    if (this.eatingGameButton.mouseOverButton) {
      fill(0, 0, 200);
    }
    this.eatingGameButton.displayButton();

    fill(0, 0, 255);
    if (this.typingGameButton.mouseOverButton) {
      fill(0, 0, 200);
    }
    this.typingGameButton.displayButton();

    fill(0, 0, 255);
    if (this.triviaGameButton.mouseOverButton) {
      fill(0, 0, 200);
    }
    this.triviaGameButton.displayButton();
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
  // Makes button clickable on menu
  if (state === 0) {
    if (myMenu.menuButton.mouseOverButton) {
      state = 4;
      myTypingGame.createTimer(90000);
      myEatingGame.createArrow();
      myEatingGame.spawnTimer.reset(myEatingGame.spawnRate);
    }
  }

  // Makes buttons clickable in trivia game
  else if (state === 1 && triviaState === 0) {
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
        if (myTrivia.lives > 0){
          myTrivia.triviaLevel += 1;
          triviaState = 0;
        }
        else{
          myTrivia.lives = 3;
          triviaState = 0;
        }
      }
      else if (myTrivia.lives > 0) {
        state = 0;
      }
    }
  }

  // Button on end screen of typing game
  else if (state === 2 && typingState === 1) {
    if (myTypingGame.typingButton.mouseOverButton) {
      if (myTypingGame.win) {
        if (myTypingGame.speechLevel < myTypingGame.maxSpeechLevel - 1) {
          myTypingGame.speechLevel += 1;
          myTypingGame.createTimer(90000);
          myTypingGame.lives = 15;
          myTypingGame.phrase = speeches[myTypingGame.speechLevel];
          myTypingGame.firstLetter = myTypingGame.phrase[0];
          myTypingGame.win = false;
          typingState = 0;
        }

        else {
          state = 0;
        }
      }
      else {
        myTypingGame.createTimer(90000);
        myTypingGame.lives = 15;
        myTypingGame.phrase = speeches[myTypingGame.speechLevel];
        myTypingGame.firstLetter = myTypingGame.phrase[0];
        typingState = 0;
      }
    }
  }

  // Eating game buttons
  else if (state === 3 && eatingState === 1) {
    if (myEatingGame.winButton.mouseOverButton) {
      if (myEatingGame.level < myEatingGame.maxLevel - 1) {
        myEatingGame.level += 1;
        myEatingGame.gameTimer.reset(myEatingGame.spawnRate[myEatingGame.level] * myEatingGame.amountOfArrows[myEatingGame.level]);
        myEatingGame.spawnTimer.reset(myEatingGame.spawnRate[myEatingGame.level]);
        myEatingGame.lives = 10;
        myEatingGame.arrowArray = [];
        myEatingGame.createArrow();
        eatingState = 0;
        myEatingGame.winButton.mouseOverButton = false;
      }
      else {
        myEatingGame.level = 0;
        state = 0;
      }
    }

    else if (myEatingGame.lossButton.mouseOverButton) {
      myEatingGame.gameTimer.reset(myEatingGame.spawnRate[myEatingGame.level] * myEatingGame.amountOfArrows[myEatingGame.level]);
      myEatingGame.spawnTimer.reset(myEatingGame.spawnRate[myEatingGame.level]);
      myEatingGame.lives = 10;
      myEatingGame.arrowArray = [];
      myEatingGame.createArrow();
      eatingState = 0;
      myEatingGame.lossButton.mouseOverButton = false;
    }
  }

  // Level Select
  else if (state === 4) {
    if (myMenu.triviaGameButton.mouseOverButton) {
      state = 1;
      triviaState = 0;
    }

    if (myMenu.typingGameButton.mouseOverButton) {
      myTypingGame.createTimer(90000);
      myTypingGame.lives = 15;
      myTypingGame.phrase = speeches[0];
      state = 2;
      typingState = 0;
    }

    if (myMenu.eatingGameButton.mouseOverButton) {
      myEatingGame.gameTimer.reset(myEatingGame.spawnRate[0] * myEatingGame.amountOfArrows[0]);
      myEatingGame.spawnTimer.reset(myEatingGame.spawnRate[0]);
      myEatingGame.lives = 10;
      myEatingGame.arrowArray = [];
      myEatingGame.createArrow();
      state = 3;
      eatingState = 0;
    }
  }
}

function keyPressed() {
  // Typing game
  // Checks if the key pressed is equal to the first letter in the phrase
  if (state === 2) {
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
  if (state === 3 && eatingState === 0) {
    if (keyCode === 65 || keyCode === LEFT_ARROW) {
      // Left arrow === 0
      eatingCheck = true;
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        // since I am spawning two random squares at a time, sometimes they will spawn on top of each other. This checks for that
        if (myEatingGame.arrowArray[i].arrowDir === 0 &&
          myEatingGame.arrowArray[i + 1].arrowDir === 0 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32 &&
          myEatingGame.arrowArray[i + 1].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i + 1].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 2);
        }

        if (myEatingGame.arrowArray[i].arrowDir === 0 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
      if (eatingCheck) {
        myEatingGame.removeLife();
      }
    }

    if (keyCode === 83 || keyCode === UP_ARROW) {
      // Up arrow === 1
      eatingCheck = true;
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        // since I am spawning two random squares at a time, sometimes they will spawn on top of each other. This checks for that
        if (myEatingGame.arrowArray[i].arrowDir === 1 &&
          myEatingGame.arrowArray[i + 1].arrowDir === 1 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32 &&
          myEatingGame.arrowArray[i + 1].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i + 1].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 2);
        }

        if (myEatingGame.arrowArray[i].arrowDir === 1 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
      if (eatingCheck) {
        myEatingGame.removeLife();
      }
    }

    if (keyCode === 68 || keyCode === DOWN_ARROW) {
      // Down Arrow === 2
      eatingCheck = true;
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        // since I am spawning two random squares at a time, sometimes they will spawn on top of each other. This checks for that
        if (myEatingGame.arrowArray[i].arrowDir === 2 &&
        myEatingGame.arrowArray[i + 1].arrowDir === 2 &&
        myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
        myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32 &&
        myEatingGame.arrowArray[i + 1].y >= myEatingGame.trackY - 32 &&
        myEatingGame.arrowArray[i + 1].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 2);
        }

        if (myEatingGame.arrowArray[i].arrowDir === 2 &&
        myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
        myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
      if (eatingCheck) {
        myEatingGame.removeLife();
      }
    }

    if (keyCode === 70 || keyCode === RIGHT_ARROW) {
      // Right arrow === 3
      eatingCheck = true;
      for (let i = 0; i < myEatingGame.arrowArray.length - 1; i++) {
        // since I am spawning two random squares at a time, sometimes they will spawn on top of each other. This checks for that
        if (myEatingGame.arrowArray[i].arrowDir === 3 &&
          myEatingGame.arrowArray[i + 1].arrowDir === 3 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32 &&
          myEatingGame.arrowArray[i + 1].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i + 1].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 2);
        }

        // checks for a single square
        if (myEatingGame.arrowArray[i].arrowDir === 3 &&
          myEatingGame.arrowArray[i].y >= myEatingGame.trackY - 32 &&
          myEatingGame.arrowArray[i].y <= myEatingGame.trackY + 32) {
          eatingCheck = false;
          myEatingGame.arrowArray.splice(i, 1);
        }
      }
      if (eatingCheck) {
        myEatingGame.removeLife();
      }
    }
  }
}
