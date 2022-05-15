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
(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

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
    quizContainer.innerHTML = output.join(" ");
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = "none";
    }
    else{
      previousButton.style.display = "inline-block";
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    }
    else{
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What should the internal cooking temperature for chicken?",
      answers: {
        a: "265℉",
        b: "165℉",
        c: "65℉"
      },
      correctAnswer: "b"
    },
    {
      question: "When is national BBQ month?",
      answers: {
        a: "July ",
        b: "May ",
        c: "Feburary"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the most popular wood usded in smoking meats?",
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
        a: "Horseradish",
        b: "Hp Sauce",
        c: "Ketchup",
        d: "Mustard"
      },
      correctAnswer: "a"
    },  
    {
      question: "What causes the red-pink ring that appear in meat after it's been smoked?",
      answers: {
        a: "The ring shows that the meat is not yet fully cooked",
        b: "A chemical reaction invlving nitrogen dioxide",
        c: "Wood particles from charcoal that discolor the meat"
      },
      correctAnswer: "b"
    }  
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
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
// Credit goes to: https://www.sitepoint.com/simple-javascript-quiz/
//============================================
