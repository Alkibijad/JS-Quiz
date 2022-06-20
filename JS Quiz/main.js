function createQuiz(data) {
  let catDIV = document.querySelector(".categories");
  let optionsDiv = document.querySelector(".options");
  let categories = [];
  let questions = [];
  let currentQuestion = 0;
  let userResoult = {
    point: 0,
    userAnwer: [],
    questions: [],
  };

  getCategories();
  function getCategories() {
    data.forEach((cat) => {
      if (!categories.includes(cat.category)) {
        categories.push(cat.category);
      }
    });
    categories.length ? displayCategories() : null;
  }

  function displayCategories() {
    let text = `<div>`;
    for (let i = 0; i < categories.length; i++) {
      text += `<button class="categorieBTN">${categories[i]}</button>`;
    }
    catDIV.innerHTML = text;
    selectCat();
  }

  function selectCat() {
    let catBTN = document.querySelectorAll(".categorieBTN");

    for (let i = 0; i < catBTN.length; i++) {
      catBTN[i].addEventListener("click", function () {
        getQuestionsFormSelected(this.innerHTML);
      });
    }
  }

  function getQuestionsFormSelected(selectedCat) {
    userResoult = {
      point: 0,
      userAnwer: [],
      questions: [],
    };
    questions = data.filter((el) => el.category === selectedCat);
    questions.length ? showQuestion() : null;
  }

  function showQuestion() {
    let questionsDiv = document.querySelector(".questions");
    questionsDiv.innerHTML = `<h3 class="question">${questions[currentQuestion].question}</h3>`;

    showOptions();
  }

  function showOptions() {
    optionsDiv.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
      let optionBTN = document.createElement("button");
      optionBTN.className = "BtnOpt";
      optionBTN.innerHTML = questions[currentQuestion].options[i];
      optionBTN.onclick = checkAnswer;
      optionsDiv.appendChild(optionBTN);
    }
  }

  function checkAnswer(e) {
    let userAnswer = e.target.innerHTML;
    let points = 0;

    if (userAnswer === questions[currentQuestion].correct_answer) {
      e.target.style.background = "green";
      points = 1;
    } else {
      e.target.style.background = "red";
      let index = questions[currentQuestion].options.indexOf(
        questions[currentQuestion].correct_answer
      );
      document.querySelectorAll(".BtnOpt")[index].style.background = "green";
    }

    userResoult.point += points;
    userResoult.userAnwer.push(userAnswer);
    userResoult.questions.push(questions[currentQuestion]);

    if (questions.length > currentQuestion + 1) {
      setTimeout(function () {
        currentQuestion++;

        showQuestion();
      }, 500);
    } else {
      displayResult();
    }
  }

  function displayResult() {
    console.log(userResoult);
    userResoult = {
      point: 0,
      userAnwer: [],
      questions: [],
    };
  }

  // last bracket
}
