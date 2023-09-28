// navbar shrinkage
function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
    document.getElementById('menu').style.borderRadius = '10px';
  }
}

//========================================================

// below is for quiz page
// Credit goes to: https://www.sitepoint.com/simple-javascript-quiz/

//============================================
(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What should the internal cooking temperature for chicken should be?",
      answers: {
        a: "265℉",
        b: "165℉",
        c: "65℉"
      },
      correctAnswer: "b"
    },
    {
      question: "When is the national BBQ month?",
      answers: {
        a: "July ",
        b: "May ",
        c: "Feburary"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the most popular wood used in smoking meats?",
      answers: {
        a: "Hickory",
        b: "Mesquite",
        c: "Oak",
        d: "2x4"
      },
      correctAnswer: "c"
    },
    {
      question: "The meat is typically served with a strong what?",
      answers: {
        a: "Mustard",
        b: "Hp Sauce",
        c: "Ketchup",
        d: "Horseradish"
      },
      correctAnswer: "d"
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

//==============================================================

const button = document.querySelector(".containerJoke button");
const jokeDiv = document.querySelector(".containerJoke .joke p");

document.addEventListener("DOMContentLoaded", getJoke);

button.addEventListener("click", getJoke);

async function getJoke() {
  const jokeData = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const jokeObj = await jokeData.json();
  jokeDiv.innerHTML = jokeObj.joke;
  console.log(jokeData);
}

//===================================================================

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'So,',
  'sooner or later',
  'you are going to realize',
  'that burning 2x4 is not all',
  'that great but for firewood and',
  'that there is a difference',
  'between knowing the right source', 
  'of fuel to use!!',
  'Be Calm and Cook On!'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1200)
  })
  counter = (counter + 1) % phrases.length
}

next()

/*function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}*/

function validateForm() {
  let firstName = document.forms["myForm"]["fname"].value;
  let lastName = document.forms["myForm"]["lname"].value;
  let email = document.forms["myForm"]["email"].value;
  if (firstName == "") {
    alert("First name must be filled out");
    return false;
  }
  else if (lastName == "") {
    alert("Last name must be filled out.")
  }
  else if (email == "") {
    alert("Last name must be filled out.")
  }
}

//=======================================================

// Initialize timer variables
let countdownInterval;
let remainingTime = 0; // Initialize to 0 when the page loads
let isCounting = false;

// Function to start the countdown
function startCountdown() {
  if (isCounting) return; // Prevent starting a new countdown while one is running

  const countdownInput = document.getElementById('countdown-input');
  const countdownDisplay = document.getElementById('countdown');

  // Get the countdown duration from user input
  const countdownDuration = parseInt(countdownInput.value, 10);
  if (isNaN(countdownDuration) || countdownDuration <= 0) {
    alert('Please enter a valid positive number for the countdown duration.');
    return;
  }

  remainingTime = countdownDuration;
  updateDisplay();

  countdownInterval = setInterval(function() {
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.innerHTML = "Countdown Over!";
      isCounting = false;
    } else {
      remainingTime--;
      updateDisplay();
    }
  }, 1000);

  isCounting = true;
}

// Function to stop the countdown
function stopCountdown() {
  if (!isCounting) return;

  clearInterval(countdownInterval);
  isCounting = false;
}

// Function to reset the countdown
function resetCountdown() {
  clearInterval(countdownInterval);
  remainingTime = 0;
  isCounting = false;
  updateDisplay();

  const countdownInput = document.getElementById('countdown-input');
  countdownInput.value = '';
}

// Function to update the countdown display
function updateDisplay() {
  const countdownDisplay = document.getElementById('countdown');
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  countdownDisplay.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Save timer state to local storage when the page unloads
window.addEventListener('beforeunload', function() {
  if (isCounting) {
    localStorage.setItem('countdownRemainingTime', remainingTime.toString());
  } else {
    localStorage.removeItem('countdownRemainingTime');
  }
});
