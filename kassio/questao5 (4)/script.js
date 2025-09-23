// Array de objetos com as perguntas, opções e respostas
const questions = [
    {
        question: "Qual é a capital da França?",
        answers: [
            { text: "Berlim", correct: false },
            { text: "Paris", correct: true },
            { text: "Madri", correct: false },
            { text: "Roma", correct: false }
        ]
    },
    {
        question: "Qual animal é conhecido como o 'Rei da Selva'?",
        answers: [
            { text: "Tigre", correct: false },
            { text: "Urso", correct: false },
            { text: "Leão", correct: true },
            { text: "Elefante", correct: false }
        ]
    },
    {
        question: "Quantos planetas existem no sistema solar?",
        answers: [
            { text: "7", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "10", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano do mundo?",
        answers: [
            { text: "Oceano Atlântico", correct: false },
            { text: "Oceano Índico", correct: false },
            { text: "Oceano Ártico", correct: false },
            { text: "Oceano Pacífico", correct: true }
        ]
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    }
];

// Seleciona os elementos do HTML
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const submitBtn = document.getElementById('submit-btn');
const scoreText = document.getElementById('score-text');
const correctAnswersText = document.getElementById('correct-answers-text');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
const correctAnswers = []; // Array para armazenar as respostas corretas

// Função para iniciar o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers.length = 0; // Limpa o array de respostas corretas
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    submitBtn.textContent = 'Próxima';
    showQuestion();
}

// Função para exibir a pergunta atual
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Função para resetar o estado da página
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    submitBtn.classList.add('hidden');
}

// Função para lidar com a seleção de uma resposta
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    // Se a resposta estiver correta, incrementa a pontuação
    if (isCorrect) {
        score++;
    } else {
        // Armazena a pergunta e a resposta correta se a escolha for errada
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answers.find(answer => answer.correct);
        correctAnswers.push({
            question: currentQuestion.question,
            correctAnswer: correctAnswer.text
        });
    }

    // Marca todos os botões com cores de feedback
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Desabilita os botões para evitar mais cliques
    });

    submitBtn.classList.remove('hidden');
}

// Função para lidar com o botão "Próxima"
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Função para mostrar o resultado final
function showResult() {
    resetState();
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    scoreText.textContent = `Sua pontuação é ${score} de ${questions.length}.`;

    if (correctAnswers.length > 0) {
        correctAnswersText.innerHTML = '<h3>Respostas Incorretas:</h3>';
        correctAnswers.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `Pergunta: ${item.question} | Resposta Correta: ${item.correctAnswer}`;
            correctAnswersText.appendChild(p);
        });
    } else {
        correctAnswersText.innerHTML = '<h3>Todas as suas respostas estão corretas!</h3>';
    }

    restartBtn.addEventListener('click', startQuiz);
}

// Adiciona o "ouvinte" de evento ao botão "Próxima"
submitBtn.addEventListener('click', handleNextButton);

// Inicia o quiz ao carregar a página
startQuiz();