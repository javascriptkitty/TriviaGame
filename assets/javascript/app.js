var countries = [
  {
    name: "AUSTRALIA",
    shape: "assets/images/australia_.png",
    image: "assets/images/australia.png"
  },

  {
    name: "CANADA",
    shape: "assets/images/canada_.png",
    image: "assets/images/canada.png"
  },
  {
    name: "CHILE",
    shape: "assets/images/chile_.png",
    image: "assets/images/chile.png"
  },
  {
    name: "CROATIA",
    shape: "assets/images/croatia_.png",
    image: "assets/images/croatia.png"
  },
  {
    name: "FRANCE",
    shape: "assets/images/france_.png",
    image: "assets/images/france.png"
  },
  {
    name: "GERMANY",
    shape: "assets/images/germ_.png",
    image: "assets/images/germ.png"
  },
  {
    name: "INDIA",
    shape: "assets/images/india_.png",
    image: "assets/images/india.png"
  },
  {
    name: "ICELAND",
    shape: "assets/images/ice_.png",
    image: "assets/images/ice.png"
  },
  {
    name: "ITALY",
    shape: "assets/images/italy_.png",
    image: "assets/images/italy.png"
  },
  {
    name: "JAPAN",
    shape: "assets/images/japan_.png",
    image: "assets/images/japan.png"
  },
  {
    name: "PANAMA",
    shape: "assets/images/panama_.png",
    image: "assets/images/panama.png"
  },
  {
    name: "MEXICO",
    shape: "assets/images/mexico_.png",
    image: "assets/images/mexico.png"
  },
  {
    name: "NORTH KOREA",
    shape: "assets/images/nkorea_.png",
    image: "assets/images/nkorea.png"
  },
  {
    name: "SOUTH KOREA",
    shape: "assets/images/skorea_.png",
    image: "assets/images/skorea.png"
  },

  {
    name: "RUSSIA",
    shape: "assets/images/rus_.png",
    image: "assets/images/rus.png"
  },
  {
    name: "THAILAND",
    shape: "assets/images/thailand_.png",
    image: "assets/images/thailand.png"
  },

  {
    name: "UNITED KINDOM",
    shape: "assets/images/uk_.png",
    image: "assets/images/uk.png"
  },
  {
    name: "USA",
    shape: "assets/images/usa_.png",
    image: "assets/images/usa.png"
  }
];

countries.sort(function() {
  return 0.5 - Math.random();
});

var number;
var intervalId;
var usersInput;
var timerOn = false;
var correct = 0;
var questionIndex = 0;

$(document).ready(function() {
  $("#start").on("click", function() {
    $(".start").css("display", "none");
    $(".quiz").css("display", "block");
    displayQuestion(questionIndex);
    $(".names").on("click", checkAnswer);
  });
});

// TIMER
function startTimer() {
  number = 10;
  intervalId = setInterval(decrement, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}
function decrement() {
  //debugger;
  number--;
  $("#time").text(" " + number);
  if (number === 0) {
    clearInterval(intervalId);
    timeUp();
  }
}

// QUIZ
function displayQuestion(index) {
  $(".check").css("display", "none");
  $(".timer").css("display", "block");
  $("#question").css("display", "block");
  $(".names").css("display", "block");
  $("#image").attr("src", countries[index].shape);
  startTimer();
  showAnswers(index);
}

function showAnswers(index) {
  var arr = [countries[index].name];
  while (arr.length < 4) {
    var random = countries[Math.floor(Math.random() * countries.length)];
    if (arr.includes(random.name) == false) {
      arr.push(random.name);
    }
  }
  arr.sort(function() {
    return 0.5 - Math.random();
  });

  updateDivs(arr);
  //console.log(arr);
}

function updateDivs(choices) {
  $(".names").each(function(index) {
    $(this).text(choices[index]);
  });
}

//ANSWER
function checkAnswer() {
  stopTimer();
  $("#image").attr("src", countries[questionIndex].image);
  $(".check").css("display", "block");
  $(".names").css("display", "none");
  $("#question").css("display", "none");
  $(".timer").css("display", "none");
  usersInput = $(this).text();

  if (usersInput === countries[questionIndex].name) {
    $(".check").text("CORRECT!");
    correct++;
  } else {
    $(".check").text(
      "Nope! The correct answer was: " + countries[questionIndex].name
    );
  }
  delayQuestion();
}

function delayQuestion() {
  setTimeout(function() {
    if (questionIndex < 17) {
      questionIndex++;
      displayQuestion(questionIndex);
    } else {
      results();
    }
  }, 3000);
}
function timeUp() {
  $(".check").css("display", "block");
  $(".names").css("display", "none");
  $("#question").css("display", "none");
  $(".timer").css("display", "none");
  $("#image").attr("src", countries[questionIndex].image);
  $(".check").text(
    "Time's up! The correct answer was: " + countries[questionIndex].name
  );
  delayQuestion();
}

// RESULT
function results() {
  $(".quiz").css("display", "none");
  $(".score").css("display", "block");
  var message;
  if (correct < countries.length * 0.4) {
    message = "your geography sucks, you must be american";
  } else if (correct < countries.length * 0.6) {
    message = "your geography skills need some improvement!";
  } else if (correct < countries.length * 0.8) {
    message = "your geography skills are OK, but not great!";
  } else {
    message = "very good!";
  }
  $(".score").attr("display", "flex");
  $(".score").attr({ margin: "auto 0" });
  $(".score").prepend("<h3>" + message + "</h3>");
  $(".score").prepend("<h2>" + correct + " of " + countries.length + "</h2>");
  $("#reStart").on("click", reset);
}

function reset() {
  timerOn = false;
  correct = 0;
  questionIndex = 0;
  $(".start").css("display", "block");
  $(".score").css("display", "none");
}
