var startBtn = document.getElementById("startBtn");
var questionArr = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["string", "boolean", "alerts", "numbers"],
        correctAnswer: 2

    },
    {
        question: "The condition in an if/else statement is enclosed in _________ .",
        choices: ["quotes", "curly braces", "parentheses", "square brackets"],
        correctAnswer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["numbers and strings", "other array(s)", "quotes", "all of the above"],
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing cotent to the debugger is:",
        choices: ["Javascript", "for loops", "console.log", "terminal/bash"],
        correctAnswer: 2
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        choices: ["commas", "curly braces", "quotes", "parentheses"],
        correctAnswer: 2

    }];

var score = 0;
var time = 1;
var timer = 300;
var stopInterval;
var startBtn = document.getElementById("startBtn");
var nextBtn = document.getElementById("nextBtn");
var currentQuestionIndex = 0;
var quizInterval;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        } 
        if (timer == 0) 
            alert("Time's Up!");
    }, 1000);      
}

startBtn.addEventListener("click", function () {

    stopInterval = setInterval(function () {
        time--;
        startBtn.textContent = "Your quiz starts in " + time;
        if (time === 0) {
            clearInterval(stopInterval);

            document.getElementById("hide1").classList.add("hide")
            document.getElementById("quizBox").classList.remove("hide");
            document.getElementById("navigationBox").classList.remove("hide");

            quizInterval = setInterval(quizTimer, 1000);
        }
    }, 1000);

    // 5 minute timer 
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
            } 
            if (timer == 0) 
                alert("Time's Up!");
        }, 1000);      
    }
    
   
    var fiveMinutes = 60 * 5,
    display = document.querySelector('#time');
startTimer(fiveMinutes, display);
        populateQuestion();
    })

function populateQuestion() {

    document.getElementById("questions").innerText = "Q" + (currentQuestionIndex + 1) + ": " + questionArr[currentQuestionIndex].question;
    var buttons = document.getElementById("buttons");
    buttons.innerHTML = "";

    for (var i = 0; i < questionArr[currentQuestionIndex].choices.length; i++) {
        var button = document.createElement("button");
        button.innerText = questionArr[currentQuestionIndex].choices[i];
        button.className = "btn rounded bg-primary choices";
        button.answerIndex = i;
        button.addEventListener("click", clickAnswer);
        buttons.appendChild(button);
    }
}


function clickAnswer() {
    var isCorrect = false;

    var rightWrong =  document.getElementById("rightWrong");


    if (questionArr[currentQuestionIndex].correctAnswer == this.answerIndex) {
        isCorrect = true;

    }

    if (isCorrect) {
        score += 10;
        var right = document.createElement("div");
        right.textContent = "CORRECT";
        rightWrong.append(right);
        nextQuestion();
    }
    else {
        timer -= 15;
        var wrong = document.createElement("div");
        wrong.textContent = "INCORRECT";
        rightWrong.append(wrong);
        nextQuestion();

    }
}

function nextQuestion() {
    if (currentQuestionIndex < (questionArr.length - 1)) {
        currentQuestionIndex++;
        populateQuestion();
    }
    else {
        score += timer;
        document.getElementById("navigationBox").classList.add("hide");
        document.getElementById("quizBox").classList.add("hide");
        document.getElementById("finalScore").classList.remove("hide");
        clearInterval(quizInterval);
    }
}

nextBtn.addEventListener("click", nextQuestion);

document.getElementById("addScore").addEventListener("click", function () {
    
    var myscore = {
        initials: document.getElementById("initials").value,
        score: score
    };

    var highScores = localStorage.getItem("highScores");
    if (highScores != null) {
        highScores = JSON.parse(highScores);
    }
    else {
        highScores = [];
    }

    highScores.push(myscore);
    var showScore = document.createElement("tr");
    myscore.textContent = showScore;

    localStorage.setItem("highScores", JSON.stringify(highScores));
});
    
// I HAD TROUBLE GETTING THE SCORES TO LOG AS WELL AS GETTING THE START OVER BUTTON TO GET BACK TO THE START PAGE