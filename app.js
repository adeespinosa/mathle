var start = false;
var numClicked;
var repeatDigit = false;
var posCounter = 1;
var rowCounter = 1;
var correct4Digit = random4Digit();
var user4Digit = [];
var wprd = 0;
var rprd = 0;
var highStreak = 0;
var currStreak = 0;

//Mechanism of the user's click
$(".num-key").click(function(){
  start = true;
  numClicked = $(this).attr("id");
  var position = ".guess.x-" + rowCounter + " .letter.y-" + posCounter;

  //Check if number clicked is repeated
  for(var i=0; i<posCounter; i++){
    if(user4Digit[i] === numClicked)
      repeatDigit = true;
  }

  if(repeatDigit === true){
    posCounter--;
    $(position).addClass("repeat");
    $(position).text("X");
    setTimeout(function(){
      $(position).removeClass("repeat");
      $(position).text("");
    }, 500);
    repeatDigit = false;
  }else{
    user4Digit.push(numClicked);
    $(position).text(numClicked);
  }


  if(posCounter === 4){
    posCounter = 1;
    checkAnswer(correct4Digit, user4Digit);
  }
  else{
    posCounter++;
  }
});

//Mechanism of the user's right click
for(var i=0; i<10; i++){
  document.querySelectorAll(".num-key")[i].addEventListener("contextmenu", function(e){
    $(this).toggleClass("right-clicked");
    e.preventDefault();
  },false);
}

//Clear Mechanism
$(".delete").click(function(){
  for(var i=0; i<posCounter; i++){
    var position = ".guess.x-" + rowCounter + " .letter.y-" + i;
    $(position).text('');
  }

  posCounter = 1;
  user4Digit = [];
});

//Nav Section
$(".help").click(function(){
  $(".how-to-play").toggleClass("hide");
  $(".statistics").addClass("hide");
});
$(".stats-icon").click(function(){
  $(".statistics").toggleClass("hide");
  $(".how-to-play").addClass("hide");
});

$(".close-window").click(function(){
  $(".how-to-play").addClass("hide");
  $(".statistics").addClass("hide");
});
//Stats Seciton
$(".stats-icon").click(function(){
  $(".highest-streak").text(highStreak);
  $(".current-streak").text(currStreak);
});
$(".reset").click(function(){
  highStreak = 0;
  currStreak = 0;
  $(".highest-streak").text(highStreak);
  $(".current-streak").text(currStreak);
});
//GAME FUNCTIONS
//Compare the user's 4 digit to the correct 4 digit
function checkAnswer(a,b){
  var checkerPos = ".checker.x-" + rowCounter;
  if(rowCounter < 12){
    for(var i=0; i<4; i++){
      for(var j=0; j<4; j++){
        if(a[i] === b[j]){
          if(i === j){
            rprd++;
          }
          else{
            wprd++;
          }
        }
      }
    }
    if(rprd === 4)
      winner(rowCounter);
    else{
      if(wprd === 0 && rprd === 0)
        $(checkerPos).text(wprd + ", " + rprd);
      else if(wprd === 0)
        $(checkerPos).text(wprd + ", +" + rprd);
      else if(rprd === 0)
        $(checkerPos).text("-" + wprd + ", " + rprd);
      else
        $(checkerPos).text("-" + wprd + ", +" + rprd);

      rowCounter++;
      user4Digit = [];
      rprd = 0;
      wprd = 0;
  }} else{
    gameOver(rowCounter);
  }
}

//Random 4-digit Nunmber generator
function random4Digit(){
  return shuffle("0123456789".split('')).join('').substring(0,4).split('');
}
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

//Winner!
function winner(rc){
  var checkerPos = ".checker.x-" + rc;
  $(checkerPos).text("Winner!");
  $(checkerPos).addClass("checker-adjust winner");
  $(".num-key").addClass("button-disabled");

  //Update Streak
  currStreak++;
  if(currStreak >= highStreak){
    highStreak = currStreak;
  }
}

//Game-over
function gameOver(rc){
  var checkerPos = ".checker.x-" + rc;
  $(checkerPos).text("Loser!");
  $(checkerPos).addClass("checker-adjust loser");
  $(".num-key").addClass("button-disabled");

  //Update Streak
  currStreak = 0;
}

//New Game
$(".new-game").click(function(){
  newGame();
});

function newGame(){
  var checkerPos = ".checker.x-" + rowCounter;
  $(checkerPos).removeClass("checker-adjust");
  $("button").removeClass("right-clicked");
  $(".num-key").removeClass("button-disabled");

  $(".letter").text("");
  $(".checker").text("");
  correct4Digit = random4Digit();
  start = false;
  posCounter = 1;
  rowCounter = 1;
  user4Digit = [];
  wprd = 0;
  rprd = 0;
}
