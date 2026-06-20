const API_BASE_URL = 'http://localhost:3000/api';

let currentSession = null;
let currentQuestionIndex = 0;
let currentQuestionData = null;
let score = 0;
let currentTotalQuestions = 0;

async function initQuiz(category = 'ALL') {
  try {
    const response = await fetch(`${API_BASE_URL}/session/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    currentSession = data.sessionId;
    currentQuestionIndex = 0;
    currentQuestionData = data.currentQuestionData;
    currentTotalQuestions = data.totalQuestions;
    score = 0;

    await displayQuestion();
    updateProgress();
  } catch (error) {
    console.error('Error starting quiz:', error);
    showError('Failed to start quiz. Please try again.');
  }
}

async function displayQuestion() {
  try {
    const response = await fetch(`${API_BASE_URL}/session/${currentSession}/question?index=${currentQuestionIndex}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    currentQuestionData = data.data.question;
    currentQuestionIndex = data.data.currentIndex;
    currentTotalQuestions = data.data.totalQuestions;

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
      <div class="category-badge">${currentQuestionData.cat}</div>
      <h2 class="question-text">${currentQuestionData.q}</h2>
      <div class="options-container">
        ${currentQuestionData.opt.map((option, index) => `
          <button class="option-btn" onclick="selectOption(${index})">
            ${option}
          </button>
        `).join('')}
      </div>
      <div class="navigation">
        <button id="prev-btn" onclick="previousQuestion()" ${data.data.previousIndex === null ? 'disabled' : ''}>Previous</button>
        <button id="next-btn" onclick="nextQuestion()" ${data.data.nextIndex === null ? 'disabled' : ''}>Next</button>
      </div>
    `;

    updateProgress();
  } catch (error) {
    console.error('Error displaying question:', error);
    showError('Failed to load question.');
  }
}

async function selectOption(selectedIndex) {
  try {
    const response = await fetch(`${API_BASE_URL}/session/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: currentSession,
        questionId: currentQuestionData.id,
        selectedOption: selectedIndex
      })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    score = data.score;

    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === currentQuestionData.a) {
        btn.classList.add('correct');
      } else if (index === selectedIndex && !data.isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    updateProgress();
  } catch (error) {
    console.error('Error submitting answer:', error);
    showError('Failed to submit answer.');
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentTotalQuestions - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function updateProgress() {
  const progress = document.getElementById('progress');
  const scoreDisplay = document.getElementById('score');

  if (progress) {
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${currentTotalQuestions}`;
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

async function showResults() {
  try {
    const response = await fetch(`${API_BASE_URL}/session/${currentSession}/results`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    const resultContainer = document.getElementById('question-container');
    const percentage = data.data.accuracy;

    resultContainer.innerHTML = `
      <div class="results">
        <h1>Quiz Completed</h1>
        <div class="score-circle">
          <div class="score-value">${data.data.score}</div>
          <div class="score-total">/${data.data.totalQuestions}</div>
        </div>
        <div class="percentage">${percentage}%</div>
        <button onclick="restartQuiz()" class="restart-btn">Restart Quiz</button>
        <button onclick="viewAnswers()" class="review-btn">Review Answers</button>
      </div>
    `;

    const nav = document.querySelector('.navigation');
    if (nav) nav.style.display = 'none';
  } catch (error) {
    console.error('Error showing results:', error);
    showError('Failed to show results.');
  }
}

function restartQuiz() {
  const nav = document.querySelector('.navigation');
  if (nav) nav.style.display = 'block';
  initQuiz();
}

async function viewAnswers() {
  try {
    const response = await fetch(`${API_BASE_URL}/session/${currentSession}/results`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    const resultContainer = document.getElementById('question-container');

    resultContainer.innerHTML = `
      <div class="answers-review">
        <h2>Answer Review</h2>
        <div class="answers-list">
          ${data.data.answers.map((answer, index) => `
            <div class="answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
              <div class="question-num">Q${index + 1}</div>
              <div class="question-text">${answer.question}</div>
              <div class="your-answer">Your answer: ${answer.selectedOption}</div>
              <div class="correct-answer">Correct answer index: ${answer.correctOption}</div>
            </div>
          `).join('')}
        </div>
        <button onclick="restartQuiz()" class="restart-btn">Restart Quiz</button>
      </div>
    `;
  } catch (error) {
    console.error('Error viewing answers:', error);
    showError('Failed to load answers.');
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function setupCategoryFilter() {
  const categories = await getCategories();
  const categoryContainer = document.getElementById('category-filter');

  if (!categoryContainer) return;

  categoryContainer.innerHTML = `
    <button class="category-btn active" onclick="filterCategory('ALL')">ALL</button>
    ${categories.map(cat => `
      <button class="category-btn" onclick="filterCategory('${cat}')">${cat}</button>
    `).join('')}
  `;
}

function filterCategory(category) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === category) {
      btn.classList.add('active');
    }
  });

  initQuiz(category);
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  setupCategoryFilter();
  initQuiz();
});