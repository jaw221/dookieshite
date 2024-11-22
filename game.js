const gamePattern = [];
const UserClickedPattern = [];
const colors = ["red", "blue", "green", "yellow"];
let num = 1;

function nextSequence() {
  let RandNum = Math.floor(Math.random() * 4);
  let randomColor = colors[RandNum];
  gamePattern.push(randomColor);
   $("h1").text("Level " + num);
 num++;
  playSound(randomColor);
  return randomColor;
}

$(document).one("keypress", (event) => {
  if (event.key === "a") {
    nextSequence();
  }
});

function playSound(name) {
  let beep = $("#" + name);
  beep.animate({ opacity: 0.5 }, 100).animate({ opacity: 1 }, 100);
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(Clickedcolor) {
  $("#" + Clickedcolor).addClass("pressed");
  setTimeout(() => {
    $("#" + Clickedcolor).removeClass("pressed");
  }, 100);
}

$(".btn").click((event) => {
  let buttonPressed = event.target.id;
  playSound(buttonPressed);
  UserClickedPattern.push(buttonPressed);
  animatePress(buttonPressed);

  checkAnswer(UserClickedPattern.length - 1);
});

function gameOver() {
  $("h1").text("Game Over, Press the A key to restart");
  let audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);
  num = 1;
  gamePattern.length = 0;
  UserClickedPattern.length = 0;

  // Allow restarting the game
  $(document).one("keypress", (event) => {
    if (event.key === "a") {
      nextSequence();
    }
  });
}

function checkAnswer(currentLevel) {
  if (UserClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (UserClickedPattern.length === gamePattern.length) {
      $("h1").text("Correct! Get ready for the next level...");
      setTimeout(() => {
        nextSequence();
        UserClickedPattern.length = 0; // Reset user inputs for the next level
      }, 1000);
    }
  } else {
    gameOver();
  }
}
