// all variables im gonna be using

let score = 0;
let time = 60;
let index = 0;
let selectedAnswer;

const introEl = document.getElementById("intro");
const radioButtons = document.querySelectorAll('input[name="choices"]');
const soundCrt = new Audio("./correct.wav");
const soundIncrt = new Audio("./incorrect.wav");
const startBtn = document.getElementById("startbtn");
const countdown = document.getElementById("countdown");
const scores = document.getElementById("scores");
const quiz = document.getElementById("quiz");
const submitbtn = document.getElementById("submitbtn");
let question = document.getElementById("title");
let answers = document.getElementById("choices");
const resultsForm=document.getElementById("results")

// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

//making first function that will take all the questions in the question array
function displayQuestion() {
  question.textContent = questions[index].title;
  answer1.textContent = questions[index].choices[0];
  answer2.textContent = questions[index].choices[1];
  answer3.textContent = questions[index].choices[2];
  answer4.textContent = questions[index].choices[3];
}

//function for start button
function startQuiz() {
  // starts the quiz
  introEl.setAttribute("class", "hide"); // gives intro element a class of hide
  quiz.classList.remove("hide"); // removes hide class from quiz element
  scores.textContent = score; // setting the score on the scores element text content
  let startClock=setInterval(clock, 1000) // variable of setInterval 
  countdown.textContent = time; // setting the time on the countdown element text content
  displayQuestion();// runs displayQuestion function
}

startBtn.addEventListener("click", startQuiz);


let savebtn=document.getElementById("savebtn")
//if values are valid

function submitResults(){

let playerName= document.getElementById("playerName").value.trim();
let email=document.getElementById("email").value.trim();
let finalScore= document.getElementById("score").value.trim();

if (!playerName || !email || !score){
  return;
}
// save them in local storage
let resultsObj= {
  playerName,
  email,
  finalScore,
}

localStorage.setItem("resultsObj", JSON.stringify(resultsObj))
window.location.reload()
}

savebtn.addEventListener("click",submitResults)

function endQuiz() {
  quiz.setAttribute("class", "hide");
  introEl.classList.remove("hide");
  scores.textContent = score;
  introEl.textContent = `Game over, your score is: ${score}`;
  resultsForm.classList.remove("hide")

}

//function to start the countdown
function clock() {
  time--;
  countdown.textContent = time;
  if (time <= 0) {
    clearInterval(startClock)
    countdown.textContent="Game Over"
    endQuiz();
  }
}

submitbtn.addEventListener("click", () => {
  for (const button of radioButtons) {
    if (button.checked === true) { 
      // if the radio button is checked
      selectedAnswer = button.id; // assign selectedAnswer to radio button's id
      if (
        questions[index].answer === questions[index].choices[selectedAnswer]
      ) {
        // this happens when the question is right
        soundCrt.play(); // plays correct answer sound
        index++;// increases index
        if (index<5){
           // displays next question if index is less than 5
          // because there are only 5 questions, max index is 4
        displayQuestion();
    }
        button.checked = false; //unchecking the button by setting the button to false
        score++; // increase the score by 1
        scores.textContent = score; // getting h2 element with id of scores and changing text content to score
        if (index >= 5) {
          // if index is greater than or equal to 5 it will run
          endQuiz(); // a function to end the en the quiz
        }
      } else {
        // this happens when the question is wrong
        soundIncrt.play(); // plays incrrect answer sound
        time--; // subtract 1 from time
        index++;// increases index
        if (index<5){
          // displays next question if index is less than 5
         // because there are only 5 questions, max index is 4
       displayQuestion();
   }
   button.checked = false; //unchecking the button by setting the button to false
   if (index >= 5) {
    // if index is greater than or equal to 5 it will run
    endQuiz(); // a function to end the en the quiz
  }
      }
      return;
    }

  }
});
// get values from the form input

