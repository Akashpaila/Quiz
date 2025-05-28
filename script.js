// const subjectSelect = document.getElementById('subject');
// const difficultySelect = document.getElementById('difficulty');
// const numQuestionsSelect = document.getElementById('num-questions');
// const memeModeToggle = document.getElementById('meme-mode');
// const startQuizBtn = document.getElementById('start-quiz');
// const quizContainer = document.getElementById('quiz-section');
// const configContainer = document.getElementById('config-section');
// const resultContainer = document.getElementById('result-section');
// const questionNumberEl = document.getElementById('question-number');
// const questionEl = document.getElementById('question');
// const optionsEl = document.getElementById('options');
// const submitAnswerBtn = document.getElementById('submit-answer');
// const timerEl = document.getElementById('timer');
// const extendTimeBtn = document.getElementById('extend-time');
// const hintBtn = document.getElementById('hint-btn');
// const scoreEl = document.getElementById('score');
// const currentScoreEl = document.getElementById('current-score');
// const progressBar = document.getElementById('progress-bar');
// const vibeMeter = document.getElementById('vibe-meter');
// const mascotEl = document.getElementById('mascot');
// const feedbackEl = document.getElementById('feedback');
// const explanationsEl = document.getElementById('explanations');
// const restartQuizBtn = document.getElementById('restart-quiz');
// const shareScoreBtn = document.getElementById('share-score');
// const vibeResultEl = document.getElementById('vibe-result');
// const loader = document.getElementById('loader');
// const correctSound = document.getElementById('correct-sound');
// const wrongSound = document.getElementById('wrong-sound');
// const victorySound = document.getElementById('victory-sound');

// let quizData = [];
// let currentQuestion = 0;
// let score = 0;
// let timeLeft = 0;
// let timerInterval;
// let timeDeduction = 0;
// let hintDeduction = 0;
// let questionsIndexHistory = [];

// const timePerQuestion = {
//     easy: 15,
//     medium: 20,
//     hard: 30
// };

// const funnyFeedback = {
//     correct: [
//         "Doge says: Much wow, correct answer!",
//         "You're on fire! 🔥 Call the vibe police!",
//         "Nailed it! You're basically a trivia wizard! 🧙‍♂️",
//         "Vibe Check: PASSED with flying colors!"
//     ],
//     wrong: [
//         "Oof, Crying Jordan would be proud of that miss! 😢",
//         "Wah-wah! The vibes are off with that one!",
//         "Yikes, that answer was a total Rickroll! 🎵",
//         "Vibe Check: Failed, but we still love you!"
//     ]
// };

// const funnyHints = [
//     "Hmm, the answer is definitely not a toaster... or is it? 🤔",
//     "Think like a meme lord. What's the most *epic* choice?",
//     "The answer is out there... probably vibing in the multiverse!",
//     "Ask yourself: What would a dancing llama pick? 🦙",
//     "This one's tricky, but it's not *that* kind of trivia. Or is it?"
// ];

// const memeRewrites = {
//     '9': { // General Knowledge
//         'Which of these': 'Which of these is straight-up *iconic* in the meme world?',
//         'What is the': 'Yo, what’s the ultimate vibe of',
//         'Who is': 'Who’s the absolute legend known as'
//     },
//     '17': { // Science
//         'Which planet': 'Which planet is basically the Beyoncé of the solar system?',
//         'What is the': 'What’s the science-y flex called',
//         'Who discovered': 'Who was the OG nerd that discovered'
//     },
//     '23': { // History
//         'In which year': 'In what year did history get totally wild with',
//         'Who was': 'Who was the historical MVP behind',
//         'What event': 'What epic moment in history was'
//     },
//     '19': { // Mathematics
//         'What is': 'What’s the math flex for',
//         'Which of': 'Which of these is the nerdiest number cruncher for'
//     },
//     '21': { // DBMS
//         'What is': 'What’s the database drip for',
//         'Which of': 'Which of these is the SQL boss of'
//     },
//     '18': { // Computer Science
//         'What is': 'What’s the geeky code vibe for',
//         'Which of': 'Which of these is the ultimate hacker move for'
//     },
//     '11': { // Film
//         'Which movie': 'Which flick is the cinematic GOAT called',
//         'Who directed': 'Who was the big-shot director behind',
//         'What is': 'What’s the movie magic known as'
//     },
//     '22': { // Geography
//         'What is the capital': 'What’s the capital city that’s poppin’ off in',
//         'Which country': 'Which country is serving major vibes as',
//         'What is': 'What’s the geographic flex called'
//     }
// };

// const mascotComments = {
//     start: [
//         "Yo, let's vibe with some trivia! Ready, fam? 😎",
//         "Sassy Llama here, let's see if your vibes are elite!",
//         "Time to crank up the trivia vibes! Let's goooo!"
//     ],
//     correct: [
//         "BOOM! Your vibes are immaculate! Keep it up! 💪",
//         "That's the spirit! You're vibing harder than a TikTok dance! 🕺",
//         "Correct! You're basically the Einstein of vibes!"
//     ],
//     wrong: [
//         "Ouch, that answer was a vibe killer! Try again! 😜",
//         "Vibes took a hit, but you got this! Let's bounce back!",
//         "Wrong, but your effort is still giving main character energy!"
//     ],
//     hint: [
//         "Sassy Llama's hint time! Hope this helps your vibes! 🦙",
//         "Here's a spicy hint, courtesy of your vibe guide!",
//         "Llama wisdom incoming! Use this hint wisely!"
//     ],
//     end: [
//         "Quiz done! Your vibes are legendary! 🏆",
//         "Vibe Check complete! You're a trivia rockstar! 🌟",
//         "That's a wrap! Your vibes are out of this world! 🚀"
//     ]
// };

// startQuizBtn.addEventListener('click', startQuiz);
// submitAnswerBtn.addEventListener('click', submitAnswer);
// extendTimeBtn.addEventListener('click', extendTime);
// hintBtn.addEventListener('click', showHint);
// restartQuizBtn.addEventListener('click', restartQuiz);
// shareScoreBtn.addEventListener('click', shareScore);

// async function startQuiz() {
//     const subject = subjectSelect.value;
//     const difficulty = difficultySelect.value;
//     const numQuestions = parseInt(numQuestionsSelect.value);

//     configContainer.classList.add('hidden');
//     loader.classList.add('active');

//     try {
//         const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${subject}&difficulty=${difficulty}&type=multiple`);
//         const data = await response.json();
//         if (data.response_code === 0 && data.results.length > 0) {
//             quizData = data.results.map(q => ({
//                 originalQuestion: q.question,
//                 displayQuestion: rewriteQuestion(q.question, subject),
//                 options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
//                 answer: q.correct_answer,
//                 category: subject
//             }));
//             currentQuestion = 0;
//             score = 0;
//             timeDeduction = 0;
//             hintDeduction = 0;
//             questionsIndexHistory = [];
//             updateScoreDisplay();
//             updateVibeMeter();
//             loader.classList.remove('active');
//             quizContainer.classList.remove('hidden');
//             mascotEl.textContent = mascotComments.start[Math.floor(Math.random() * mascotComments.start.length)];
//             loadQuestion();
//         } else {
//             alert('Error: No questions available. Try a different category or difficulty.');
//             resetToConfig();
//         }
//     } catch (error) {
//         alert('Network error. Please check your connection and try again.');
//         console.error('Fetch error:', error);
//         resetToConfig();
//     }
// }

// function rewriteQuestion(question, category) {
//     if (!memeModeToggle.checked) return question;
//     const rewrites = memeRewrites[category] || {};
//     for (const [key, value] of Object.entries(rewrites)) {
//         if (question.startsWith(key)) {
//             return value + question.slice(key.length);
//         }
//     }
//     return `Yo, let's vibe with this: ${question}`; // Fallback rewrite
// }

// function loadQuestion() {
//     clearInterval(timerInterval);
//     feedbackEl.classList.add('hidden');
//     const currentQuiz = quizData[currentQuestion];
//     if (!currentQuiz) {
//         alert('Error: No question data available.');
//         resetToConfig();
//         return;
//     }
//     questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
//     questionEl.innerHTML = currentQuiz.displayQuestion;
//     optionsEl.innerHTML = '';
//     currentQuiz.options.forEach((option, index) => {
//         const optionContainer = document.createElement('div');
//         optionContainer.classList.add('option-container');
//         optionContainer.style.setProperty('--index', index);
//         optionContainer.innerHTML = `
//             <input type="radio" name="option" id="option${index}" value="${option}">
//             <label for="option${index}">${option}</label>
//         `;
//         optionContainer.addEventListener('click', () => selectAnswer(index));
//         optionsEl.appendChild(optionContainer);
//     });
//     timeLeft = timePerQuestion[difficultySelect.value] || 15; // Fallback to 15s if difficulty is invalid
//     timerEl.textContent = `Time: ${timeLeft}s`;
//     extendTimeBtn.style.display = 'inline-block';
//     hintBtn.style.display = 'inline-block';
//     updateProgressBar();
//     updateVibeMeter();
//     startTimer();
// }

// function startTimer() {
//     timerInterval = setInterval(() => {
//         timeLeft--;
//         timerEl.textContent = `Time: ${timeLeft}s`;
//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             submitAnswer();
//         }
//     }, 1000);
// }

// function selectAnswer(index) {
//     const radios = optionsEl.querySelectorAll('input[type="radio"]');
//     radios.forEach((radio, i) => {
//         radio.checked = i === index;
//     });
// }

// function submitAnswer() {
//     const selectedRadio = optionsEl.querySelector('input[type="radio"]:checked');
//     const selectedOption = selectedRadio ? selectedRadio.value : null;
//     const currentQuiz = quizData[currentQuestion];
//     if (!currentQuiz) {
//         alert('Error: No question data available.');
//         resetToConfig();
//         return;
//     }
//     const correctAnswer = currentQuiz.answer;

//     const optionContainers = optionsEl.querySelectorAll('.option-container');
//     optionContainers.forEach((container, i) => {
//         container.style.pointerEvents = 'none';
//         if (currentQuiz.options[i] === correctAnswer) {
//             container.classList.add('correct');
//         } else if (currentQuiz.options[i] === selectedOption && selectedOption !== correctAnswer) {
//             container.classList.add('wrong');
//         }
//     });

//     if (selectedOption === correctAnswer) {
//         score += 10;
//         try {
//             correctSound.play();
//         } catch (e) {
//             console.warn('Correct sound failed to play:', e);
//         }
//         feedbackEl.textContent = funnyFeedback.correct[Math.floor(Math.random() * funnyFeedback.correct.length)];
//         mascotEl.textContent = mascotComments.correct[Math.floor(Math.random() * mascotComments.correct.length)];
//     } else {
//         try {
//             wrongSound.play();
//         } catch (e) {
//             console.warn('Wrong sound failed to play:', e);
//         }
//         feedbackEl.textContent = funnyFeedback.wrong[Math.floor(Math.random() * funnyFeedback.wrong.length)];
//         mascotEl.textContent = mascotComments.wrong[Math.floor(Math.random() * mascotComments.wrong.length)];
//     }
//     feedbackEl.classList.remove('hidden');

//     questionsIndexHistory.push({
//         question: currentQuiz.originalQuestion, // Use original question for consistency
//         selected: selectedOption || 'None',
//         correct: correctAnswer
//     });

//     updateScoreDisplay();
//     updateVibeMeter();
//     currentQuestion++;
//     if (currentQuestion < quizData.length) {
//         loadQuestion();
//     } else {
//         showResults();
//     }
// }

// function showHint() {
//     hintDeduction += 2;
//     hintBtn.style.display = 'none';
//     feedbackEl.textContent = funnyHints[Math.floor(Math.random() * funnyHints.length)];
//     feedbackEl.classList.remove('hidden');
//     mascotEl.textContent = mascotComments.hint[Math.floor(Math.random() * mascotComments.hint.length)];
//     updateScoreDisplay();
//     updateVibeMeter();
// }

// function extendTime() {
//     timeLeft += 10;
//     timeDeduction += 5;
//     timerEl.textContent = `Time: ${timeLeft}s`;
//     extendTimeBtn.style.display = 'none';
//     updateScoreDisplay();
//     updateVibeMeter();
// }

// function updateScoreDisplay() {
//     currentScoreEl.textContent = `Score: ${score - timeDeduction - hintDeduction}`;
// }

// function updateProgressBar() {
//     const progress = ((currentQuestion + 1) / quizData.length) * 100;
//     progressBar.style.width = `${progress}%`;
// }

// function updateVibeMeter() {
//     const maxScore = quizData.length * 10;
//     const currentScore = score - timeDeduction - hintDeduction;
//     const vibePercentage = Math.max(0, (currentScore / maxScore) * 100);
//     vibeMeter.style.width = `${vibePercentage}%`;
// }

// function showResults() {
//     clearInterval(timerInterval);
//     quizContainer.classList.add('hidden');
//     resultContainer.classList.remove('hidden');
//     const finalScore = Math.max(0, score - timeDeduction - hintDeduction);
//     const maxScore = quizData.length * 10;
//     scoreEl.textContent = `Your Score: ${finalScore}/${maxScore} (Time Deduction: ${timeDeduction} points, Hint Deduction: ${hintDeduction} points)`;

//     let vibeMessage = '';
//     if (finalScore / maxScore >= 0.8) {
//         vibeMessage = "Vibe Check: You're a Meme Lord! The internet bows to you! 😎";
//     } else if (finalScore / maxScore >= 0.5) {
//         vibeMessage = "Vibe Check: Solid vibes, you're basically TikTok famous! 🕺";
//     } else {
//         vibeMessage = "Vibe Check: Lowkey vibes, but you're still a legend! 🦙";
//     }
//     vibeResultEl.textContent = vibeMessage;
//     mascotEl.textContent = mascotComments.end[Math.floor(Math.random() * mascotComments.end.length)];

//     explanationsEl.innerHTML = questionsIndexHistory.map((q, i) => `
//         <div class="p-4 bg-gray-700 rounded">
//             <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
//             <p><strong>Your Answer:</strong> ${q.selected}</p>
//             <p><strong>Correct Answer:</strong> ${q.correct}</p>
//             <p><strong>Explanation:</strong> The correct answer is "${q.correct}".</p>
//         </div>
//     `).join('');

//     try {
//         victorySound.play();
//     } catch (e) {
//         console.warn('Victory sound failed to play:', e);
//     }
//     confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 }
//     });
// }

// function shareScore() {
//     const finalScore = Math.max(0, score - timeDeduction - hintDeduction);
//     const maxScore = quizData.length * 10;
//     let shareText = `I scored ${finalScore}/${maxScore} on the Vibe Check Quiz! Can you beat my epic vibes? 😎 #VibeCheckQuiz`;
//     if (navigator.share) {
//         navigator.share({
//             title: 'Vibe Check Quiz',
//             text: shareText,
//             url: window.location.href
//         }).catch(err => console.log('Share failed:', err));
//     } else {
//         alert('Share your score: ' + shareText);
//     }
// }

// function resetToConfig() {
//     clearInterval(timerInterval);
//     quizContainer.classList.add('hidden');
//     resultContainer.classList.add('hidden');
//     configContainer.classList.remove('hidden');
//     loader.classList.remove('active');
// }

const subjectSelect = document.getElementById('subject');
const difficultySelect = document.getElementById('difficulty');
const numQuestionsSelect = document.getElementById('num-questions');
const memeModeToggle = document.getElementById('meme-mode');
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
const hintBtn = document.getElementById('hint-btn');
const scoreEl = document.getElementById('score');
const currentScoreEl = document.getElementById('current-score');
const progressBar = document.getElementById('progress-bar');
const vibeMeter = document.getElementById('vibe-meter');
const mascotEl = document.getElementById('mascot');
const feedbackEl = document.getElementById('feedback');
const explanationsEl = document.getElementById('explanations');
const restartQuizBtn = document.getElementById('restart-quiz');
const shareScoreBtn = document.getElementById('share-score');
const vibeResultEl = document.getElementById('vibe-result');
const loader = document.getElementById('loader');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const victorySound = document.getElementById('victory-sound');

let quizData = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 0;
let timerInterval;
let timeDeduction = 0;
let hintDeduction = 0;
let questionsIndexHistory = [];

const timePerQuestion = {
    easy: 15,
    medium: 20,
    hard: 30
};

const funnyFeedback = {
    correct: [
        "Doge says: Much wow, correct answer!",
        "You're on fire! 🔥 Call the vibe police!",
        "Nailed it! You're basically a trivia wizard! 🧙‍♂️",
        "Vibe Check: PASSED with flying colors!"
    ],
    wrong: [
        "Oof, Crying Jordan would be proud of that miss! 😢",
        "Wah-wah! The vibes are off with that one!",
        "Yikes, that answer was a total Rickroll! 🎵",
        "Vibe Check: Failed, but we still love you!"
    ]
};

const funnyHints = [
    "Hmm, the answer is definitely not a toaster... or is it? 🤔",
    "Think like a meme lord. What's the most *epic* choice?",
    "The answer is out there... probably vibing in the multiverse!",
    "Ask yourself: What would a dancing llama pick? 🦙",
    "This one's tricky, but it's not *that* kind of trivia. Or is it?"
];

const memeRewrites = {
    '9': { // General Knowledge
        'Which of these': 'Which of these is straight-up *iconic* in the meme world?',
        'What is the': 'Yo, what’s the ultimate vibe of',
        'Who is': 'Who’s the absolute legend known as'
    },
    '17': { // Science
        'Which planet': 'Which planet is basically the Beyoncé of the solar system?',
        'What is the': 'What’s the science-y flex called',
        'Who discovered': 'Who was the OG nerd that discovered'
    },
    '23': { // History
        'In which year': 'In what year did history get totally wild with',
        'Who was': 'Who was the historical MVP behind',
        'What event': 'What epic moment in history was'
    },
    '19': { // Mathematics
        'What is': 'What’s the math flex for',
        'Which of': 'Which of these is the nerdiest number cruncher for'
    },
    '21': { // DBMS
        'What is': 'What’s the database drip for',
        'Which of': 'Which of these is the SQL boss of'
    },
    '18': { // Computer Science
        'What is': 'What’s the geeky code vibe for',
        'Which of': 'Which of these is the ultimate hacker move for'
    },
    '11': { // Film
        'Which movie': 'Which flick is the cinematic GOAT called',
        'Who directed': 'Who was the big-shot director behind',
        'What is': 'What’s the movie magic known as'
    },
    '22': { // Geography
        'What is the capital': 'What’s the capital city that’s poppin’ off in',
        'Which country': 'Which country is serving major vibes as',
        'What is': 'What’s the geographic flex called'
    }
};

const mascotComments = {
    start: [
        "Yo, let's vibe with some trivia! Ready, fam? 😎",
        "Sassy Llama here, let's see if your vibes are elite!",
        "Time to crank up the trivia vibes! Let's goooo!"
    ],
    correct: [
        "BOOM! Your vibes are immaculate! Keep it up! 💪",
        "That's the spirit! You're vibing harder than a TikTok dance! 🕺",
        "Correct! You're basically the Einstein of vibes!"
    ],
    wrong: [
        "Ouch, that answer was a vibe killer! Try again! 😜",
        "Vibes took a hit, but you got this! Let's bounce back!",
        "Wrong, but your effort is still giving main character energy!"
    ],
    hint: [
        "Sassy Llama's hint time! Hope this helps your vibes! 🦙",
        "Here's a spicy hint, courtesy of your vibe guide!",
        "Llama wisdom incoming! Use this hint wisely!"
    ],
    end: [
        "Quiz done! Your vibes are legendary! 🏆",
        "Vibe Check complete! You're a trivia rockstar! 🌟",
        "That's a wrap! Your vibes are out of this world! 🚀"
    ]
};

startQuizBtn.addEventListener('click', startQuiz);
submitAnswerBtn.addEventListener('click', submitAnswer);
extendTimeBtn.addEventListener('click', extendTime);
hintBtn.addEventListener('click', showHint);
restartQuizBtn.addEventListener('click', restartQuiz);
shareScoreBtn.addEventListener('click', shareScore);

// Ensure Meme Mode toggle is clickable by associating label
memeModeToggle.addEventListener('change', () => {
    // Optional: Add visual feedback or logging if needed
    console.log('Meme Mode:', memeModeToggle.checked ? 'Enabled' : 'Disabled');
});

async function startQuiz() {
    const subject = subjectSelect.value;
    const difficulty = difficultySelect.value;
    const numQuestions = parseInt(numQuestionsSelect.value);

    configContainer.classList.add('hidden');
    loader.classList.add('active');

    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${subject}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        if (data.response_code === 0 && data.results.length > 0) {
            quizData = data.results.map(q => ({
                originalQuestion: q.question,
                displayQuestion: rewriteQuestion(q.question, subject),
                options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                answer: q.correct_answer,
                category: subject
            }));
            currentQuestion = 0;
            score = 0;
            timeDeduction = 0;
            hintDeduction = 0;
            questionsIndexHistory = [];
            updateScoreDisplay();
            updateVibeMeter();
            loader.classList.remove('active');
            quizContainer.classList.remove('hidden');
            mascotEl.textContent = mascotComments.start[Math.floor(Math.random() * mascotComments.start.length)];
            loadQuestion();
        } else {
            alert('Error: No questions available. Try a different category or difficulty.');
            resetToConfig();
        }
    } catch (error) {
        alert('Network error. Please check your connection and try again.');
        console.error('Fetch error:', error);
        resetToConfig();
    }
}

function rewriteQuestion(question, category) {
    if (!memeModeToggle.checked) return question;
    const rewrites = memeRewrites[category] || {};
    for (const [key, value] of Object.entries(rewrites)) {
        if (question.startsWith(key)) {
            return value + question.slice(key.length);
        }
    }
    return `Yo, let's vibe with this: ${question}`; // Fallback rewrite
}

function loadQuestion() {
    clearInterval(timerInterval);
    feedbackEl.classList.add('hidden');
    const currentQuiz = quizData[currentQuestion];
    if (!currentQuiz) {
        alert('Error: No question data available.');
        resetToConfig();
        return;
    }
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionEl.innerHTML = currentQuiz.displayQuestion;
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
    timeLeft = timePerQuestion[difficultySelect.value] || 15;
    timerEl.textContent = `Time: ${timeLeft}s`;
    extendTimeBtn.style.display = 'inline-block';
    hintBtn.style.display = 'inline-block';
    updateProgressBar();
    updateVibeMeter();
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
    const currentQuiz = quizData[currentQuestion];
    if (!currentQuiz) {
        alert('Error: No question data available.');
        resetToConfig();
        return;
    }
    const correctAnswer = currentQuiz.answer;

    const optionContainers = optionsEl.querySelectorAll('.option-container');
    optionContainers.forEach((container, i) => {
        container.style.pointerEvents = 'none';
        if (currentQuiz.options[i] === correctAnswer) {
            container.classList.add('correct');
        } else if (currentQuiz.options[i] === selectedOption && selectedOption !== correctAnswer) {
            container.classList.add('wrong');
        }
    });

    if (selectedOption === correctAnswer) {
        score += 10;
        try {
            correctSound.play();
        } catch (e) {
            console.warn('Correct sound failed to play:', e);
        }
        feedbackEl.textContent = funnyFeedback.correct[Math.floor(Math.random() * funnyFeedback.correct.length)];
        mascotEl.textContent = mascotComments.correct[Math.floor(Math.random() * mascotComments.correct.length)];
    } else {
        try {
            wrongSound.play();
        } catch (e) {
            console.warn('Wrong sound failed to play:', e);
        }
        feedbackEl.textContent = funnyFeedback.wrong[Math.floor(Math.random() * funnyFeedback.wrong.length)];
        mascotEl.textContent = mascotComments.wrong[Math.floor(Math.random() * mascotComments.wrong.length)];
    }
    feedbackEl.classList.remove('hidden');

    questionsIndexHistory.push({
        question: currentQuiz.originalQuestion,
        selected: selectedOption || 'None',
        correct: correctAnswer
    });

    updateScoreDisplay();
    updateVibeMeter();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showHint() {
    hintDeduction += 2;
    hintBtn.style.display = 'none';
    feedbackEl.textContent = funnyHints[Math.floor(Math.random() * funnyHints.length)];
    feedbackEl.classList.remove('hidden');
    mascotEl.textContent = mascotComments.hint[Math.floor(Math.random() * mascotComments.hint.length)];
    updateScoreDisplay();
    updateVibeMeter();
}

function extendTime() {
    timeLeft += 10;
    timeDeduction += 5;
    timerEl.textContent = `Time: ${timeLeft}s`;
    extendTimeBtn.style.display = 'none';
    updateScoreDisplay();
    updateVibeMeter();
}

function updateScoreDisplay() {
    currentScoreEl.textContent = `Score: ${score - timeDeduction - hintDeduction}`;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateVibeMeter() {
    const maxScore = quizData.length * 10;
    const currentScore = score - timeDeduction - hintDeduction;
    const vibePercentage = Math.max(0, (currentScore / maxScore) * 100);
    vibeMeter.style.width = `${vibePercentage}%`;
}

function showResults() {
    clearInterval(timerInterval);
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    const finalScore = Math.max(0, score - timeDeduction - hintDeduction);
    const maxScore = quizData.length * 10;
    scoreEl.textContent = `Your Score: ${finalScore}/${maxScore} (Time Deduction: ${timeDeduction} points, Hint Deduction: ${hintDeduction} points)`;

    let vibeMessage = '';
    if (finalScore / maxScore >= 0.8) {
        vibeMessage = "Vibe Check: You're a Meme Lord! The internet bows to you! 😎";
    } else if (finalScore / maxScore >= 0.5) {
        vibeMessage = "Vibe Check: Solid vibes, you're basically TikTok famous! 🕺";
    } else {
        vibeMessage = "Vibe Check: Lowkey vibes, but you're still a legend! 🦙";
    }
    vibeResultEl.textContent = vibeMessage;
    mascotEl.textContent = mascotComments.end[Math.floor(Math.random() * mascotComments.end.length)];

    explanationsEl.innerHTML = questionsIndexHistory.map((q, i) => `
        <div class="p-4 bg-gray-700 rounded">
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <p><strong>Your Answer:</strong> ${q.selected}</p>
            <p><strong>Correct Answer:</strong> ${q.correct}</p>
            <p><strong>Explanation:</strong> The correct answer is "${q.correct}".</p>
        </div>
    `).join('');

    try {
        victorySound.play();
    } catch (e) {
        console.warn('Victory sound failed to play:', e);
    }
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function shareScore() {
    const finalScore = Math.max(0, score - timeDeduction - hintDeduction);
    const maxScore = quizData.length * 10;
    let shareText = `I scored ${finalScore}/${maxScore} on the Vibe Check Quiz! Can you beat my epic vibes? 😎 #VibeCheckQuiz`;
    if (navigator.share) {
        navigator.share({
            title: 'Vibe Check Quiz',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Share failed:', err));
    } else {
        alert('Share your score: ' + shareText);
    }
}

function restartQuiz() {
    // Reset all quiz-related variables
    quizData = [];
    currentQuestion = 0;
    score = 0;
    timeDeduction = 0;
    hintDeduction = 0;
    questionsIndexHistory = [];
    timeLeft = 0;
    clearInterval(timerInterval);
    
    // Reset UI elements
    questionEl.innerHTML = '';
    optionsEl.innerHTML = '';
    feedbackEl.innerHTML = '';
    feedbackEl.classList.add('hidden');
    scoreEl.textContent = '';
    vibeResultEl.textContent = '';
    explanationsEl.innerHTML = '';
    currentScoreEl.textContent = 'Score: 0';
    progressBar.style.width = '0%';
    vibeMeter.style.width = '0%';
    mascotEl.textContent = '';

    // Show configuration section
    resultContainer.classList.add('hidden');
    quizContainer.classList.add('hidden');
    configContainer.classList.remove('hidden');
}

function resetToConfig() {
    clearInterval(timerInterval);
    quizContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    configContainer.classList.remove('hidden');
    loader.classList.remove('active');
}