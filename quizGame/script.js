let currentQuestion = 0;
let correctAnswers = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');

let questions = []; // Arreglo para almacenar las preguntas
let shuffledQuestions = []; // Arreglo para almacenar preguntas aleatorias

// Cargar las preguntas desde questions.json
fetch('questions.json') // Asegúrate de que la ruta al archivo JSON sea correcta
  .then((response) => response.json())
  .then((data) => {
    questions = data.preguntas;
    shuffleQuestions();
  })
  .catch((error) => {
    console.error('Error al cargar las preguntas:', error);
  });

function shuffleQuestions() {
  // Copiar las preguntas en un nuevo arreglo para no modificar el original
  shuffledQuestions = [...questions];

  // Mezclar el arreglo de preguntas de manera aleatoria
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [
      shuffledQuestions[j],
      shuffledQuestions[i],
    ];
  }

  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion < 5) {
    // Mostrar solo 5 preguntas
    questionElement.textContent = shuffledQuestions[currentQuestion].question;
    optionsElement.innerHTML = '';

    for (
      let i = 0;
      i < shuffledQuestions[currentQuestion].options.length;
      i++
    ) {
      const option = document.createElement('button');
      option.textContent = shuffledQuestions[currentQuestion].options[i];
      option.addEventListener('click', checkAnswer);
      optionsElement.appendChild(option);
    }
  } else {
    showResult();
  }
}

function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = shuffledQuestions[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    correctAnswers++;
  }

  currentQuestion++;

  loadQuestion();
}

function showResult() {
  optionsElement.style.display = 'none';
  messageElement.textContent = `Respondiste correctamente ${correctAnswers} de 5 preguntas.`;

  let finalMessage = '';
  if (correctAnswers === 5) {
    finalMessage = '¡Excelente! Eres un experto en conocimientos generales.';
  } else if (correctAnswers >= 3) {
    finalMessage = '¡Bien hecho! Tienes buenos conocimientos generales.';
  } else {
    finalMessage = 'Puedes mejorar tus conocimientos generales.';
  }
  messageElement.textContent += ' ' + finalMessage;

  restartButton.style.display = 'block';
}

restartButton.addEventListener('click', () => {
  currentQuestion = 0;
  correctAnswers = 0;
  optionsElement.style.display = 'block';
  messageElement.textContent = '';
  restartButton.style.display = 'none';
  shuffleQuestions();
});
