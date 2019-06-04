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

var number;
var timerOn = false;
var intervalId;
var usersInput;
var correct = 0;
var notCorrect = 0;
var questionIndex = 0;

$(document).ready(function() {
  //   function reset() {}

  $("#start").on("click", function() {
    $(".start").css("display", "none");
    $(".quiz").css("display", "block");
    displayQuestion(questionIndex);
    $(".names").on("click", checkAnswer);
  });
  if (questionIndex === 17) {
    console.log("18");
    // delayQuestion();
    // results();
  }
});

// TIMER
function startTimer() {
  number = 1;
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
    notCorrect++;
  }
  delayQuestion();
}

function delayQuestion() {
  setTimeout(function() {
    questionIndex++;
    displayQuestion(questionIndex);
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
  $(".quiz").empty();
  var score = $("<div>");
  score.text("xxx");
  $(".quiz").append(score);
}
