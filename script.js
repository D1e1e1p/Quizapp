const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b"
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hyperloop Machine Language",
    c: "Hyper Tool Multi Language",
    d: "Hyperlink Text Mark Language",
    correct: "a"
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b"
  },
  {
    question: "Which company developed Java?",
    a: "Microsoft",
    b: "Sun Microsystems",
    c: "Oracle",
    d: "IBM",
    correct: "b"
  },
  {
    question: "What does SQL stand for?",
    a: "Structured Query Language",
    b: "Strong Question Line",
    c: "Stylish Question Language",
    d: "Statement Query Logic",
    correct: "a"
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    a: "<style>",
    b: "<script>",
    c: "<css>",
    d: "<link>",
    correct: "a"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    a: "<js>",
    b: "<script>",
    c: "<javascript>",
    d: "<code>",
    correct: "b"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    a: "//",
    b: "/* */",
    c: "#",
    d: "<!-- -->",
    correct: "a"
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    a: "<script name='xxx.js'>",
    b: "<script href='xxx.js'>",
    c: "<script src='xxx.js'>",
    d: "<script file='xxx.js'>",
    correct: "c"
  }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const timeEl = document.getElementById('time');
const progressBar = document.getElementById('progress-bar');

let currentQuiz = 0;
let score = 0;
let timeLeft = 15;
let timer;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  updateProgressBar();
  resetTimer();
  startTimer();
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) answer = answerEl.id;
  });
  return answer;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
}

function updateProgressBar() {
  const progress = ((currentQuiz) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function nextQuestion() {
  const answer = getSelected();
  if (answer && answer === quizData[currentQuiz].correct) score++;

  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    endQuiz();
  }
}

submitBtn.addEventListener('click', () => {
  clearInterval(timer);
  nextQuestion();
});

function endQuiz() {
  progressBar.style.width = '100%';
  quiz.innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

