const subjectSelect = document.getElementById('subject');
const difficultySelect = document.getElementById('difficulty');
const numQuestionsSelect = document.getElementById('num-questions');
const startQuizBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-section');
const configContainer = document.getElementById('config-section');
const resultContainer = document.getElementById('result-section');
const questionNumberEl = document.getElementById('question-number');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitAnswerBtn = document.getElementById('submit-answer');
const timerEl = document.getElementById('timer');
const extendTimeBtn = document.getElementById('extend-time');
const scoreEl = document.getElementById('score');
const currentScoreEl = document.getElementById('current-score');
const progressBar = document.getElementById('progress-bar');
const explanationsEl = document.getElementById('explanations');
const restartQuizBtn = document.getElementById('restart-quiz');
const loader = document.getElementById('loader');

let quizData = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 0;
let timerInterval;
let timeDeduction = 0;
let questionsIndexHistory = [];

const timePerQuestion = {
    easy: 15,
    medium: 20,
    hard: 30
};

startQuizBtn.addEventListener('click', startQuiz);
submitAnswerBtn.addEventListener('click', submitAnswer);
extendTimeBtn.addEventListener('click', extendTime);
restartQuizBtn.addEventListener('click', restartQuiz);

async function startQuiz() {
    const subject = subjectSelect.value;
    const difficulty = difficultySelect.value;
    const numQuestions = parseInt(numQuestionsSelect.value);

    configContainer.classList.add('hidden');
    loader.classList.add('active');

    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${subject}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        if (data.response_code === 0) {
            quizData = data.results.map(q => ({
                question: q.question,
                options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                answer: q.correct_answer
            }));
            currentQuestion = 0;
            score = 0;
            timeDeduction = 0;
            questionsIndexHistory = [];
            updateScoreDisplay();
            loader.classList.remove('active');
            quizContainer.classList.remove('hidden');
            loadQuestion();
        } else {
            alert('Error fetching questions. Please try again.');
            resetToConfig();
        }
    } catch (error) {
        alert('Network error. Please check your connection and try again.');
        resetToConfig();
    } finally {
        loader.classList.remove('active');
    }
}

function loadQuestion() {
    clearInterval(timerInterval);
    const currentQuiz = quizData[currentQuestion];
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionEl.innerHTML = currentQuiz.question;
    optionsEl.innerHTML = '';
    currentQuiz.options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
        optionContainer.style.setProperty('--index', index);
        optionContainer.innerHTML = `
            <input type="radio" name="option" id="option${index}" value="${option}">
            <label for="option${index}">${option}</label>
        `;
        optionContainer.addEventListener('click', () => selectAnswer(index));
        optionsEl.appendChild(optionContainer);
    });
    timeLeft = timePerQuestion[difficultySelect.value];
    timerEl.textContent = `Time: ${timeLeft}s`;
    extendTimeBtn.style.display = 'inline-block';
    updateProgressBar();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);
}

function selectAnswer(index) {
    const radios = optionsEl.querySelectorAll('input[type="radio"]');
    radios.forEach((radio, i) => {
        radio.checked = i === index;
    });
}

function submitAnswer() {
    const selectedRadio = optionsEl.querySelector('input[type="radio"]:checked');
    const selectedOption = selectedRadio ? selectedRadio.value : null;
    const correctAnswer = quizData[currentQuestion].answer;

    const optionContainers = optionsEl.querySelectorAll('.option-container');
    optionContainers.forEach((container, i) => {
        container.style.pointerEvents = 'none';
        if (quizData[currentQuestion].options[i] === correctAnswer) {
            container.classList.add('correct');
        } else if (quizData[currentQuestion].options[i] === selectedOption && selectedOption !== correctAnswer) {
            container.classList.add('wrong');
        }
    });

    if (selectedOption === correctAnswer) {
        score += 10;
    }

    questionsIndexHistory.push({
        question: quizData[currentQuestion].question,
        selected: selectedOption || 'None',
        correct: correctAnswer
    });

    updateScoreDisplay();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function extendTime() {
    timeLeft += 10;
    timeDeduction += 5;
    timerEl.textContent = `Time: ${timeLeft}s`;
    extendTimeBtn.style.display = 'none';
    updateScoreDisplay();
}

function updateScoreDisplay() {
    currentScoreEl.textContent = `Score: ${score - timeDeduction}`;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    clearInterval(timerInterval);
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    const finalScore = Math.max(0, score - timeDeduction);
    scoreEl.textContent = `Your Score: ${finalScore}/${quizData.length * 10} (Time Deduction: ${timeDeduction} points)`;
    explanationsEl.innerHTML = questionsIndexHistory.map((q, i) => `
        <div class="p-4 bg-gray-700 rounded">
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <p><strong>Your Answer:</strong> ${q.selected}</p>
            <p><strong>Correct Answer:</strong> ${q.correct}</p>
            <p><strong>Explanation:</strong> The correct answer is "${q.correct}".</p>
        </div>
    `).join('');

    // Trigger confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function restartQuiz() {
    resultContainer.classList.add('hidden');
    configContainer.classList.remove('hidden');
}

function resetToConfig() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    configContainer.classList.remove('hidden');
    loader.classList.remove('active');
}