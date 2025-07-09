const form = document.getElementById('monster-form');
const container = document.querySelector('.questions-container');
const nextBtn = document.getElementById('next-btn');
const usernameInput = document.getElementById('username');

const monsterData = {};
let step = 0;

const steps = [
  {
    key: 'type',
    question: "What type is your monster?",
    options: [
      { label: "Humanoid", value: "humanoid" },
      { label: "One-eyed", value: "oneeye" },
      { label: "Bizarre", value: "weird" }
    ]
  },
  {
    key: 'q1_answer',
    question: "What is their personality like?",
    options: [
      { label: "Aggressive", value: "A" },
      { label: "Calm", value: "B" },
      { label: "Happy", value: "C" }
    ]
  },
  {
    key: 'q2_answer',
    question: "In what environment they live?",
    options: [
      { label: "Forest", value: "A" },
      { label: "Cave", value: "B" },
      { label: "Lab", value: "C" }
    ]
  }
];

// Validation function
function validateUsername(name) {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length > 20) {
    errors.push('Name must be 20 characters or less');
  } else if (!/^[a-zA-Z0-9\s]+$/.test(name.trim())) {
    errors.push('Name must contain only letters, numbers, and spaces');
  }
  
  return errors;
}

// Display errors function
function displayErrors(errors) {
  // Remove existing errors
  const existingErrors = document.querySelector('.error-container');
  if (existingErrors) {
    existingErrors.remove();
  }
  
  if (errors.length > 0) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = errors.map(error => `<p class="error">${error}</p>`).join('');
    
    // Insert errors before the input field
    const input = document.getElementById('username');
    input.parentNode.insertBefore(errorContainer, input);
    return true; // Has errors
  }
  return false; // No errors
}

nextBtn.addEventListener('click', () => {
  const name = document.getElementById('username').value;
  const validationErrors = validateUsername(name);
  
  // Display errors if any
  if (displayErrors(validationErrors)) {
    return; // Stop if there are validation errors
  }
  
  // If validation passes, proceed
  monsterData.username = name.trim();
  step = 0;
  renderStep(); // Start the questions
});

usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    nextBtn.click();
  }
});

// Clear errors when user starts typing
usernameInput.addEventListener('input', () => {
  const existingErrors = document.querySelector('.error-container');
  if (existingErrors) {
    existingErrors.remove();
  }
});

function renderStep() {
  const current = steps[step];
  container.innerHTML = `
    <h2>${current.question}</h2>
    <div class="button-group">
      ${current.options.map(option => `
        <button 
          type="button" 
          class="answer-btn" 
          data-key="${current.key}" 
          data-value="${option.value}">
          ${option.label}
        </button>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const value = btn.dataset.value;
      monsterData[key] = value;

      step++;
      if (step < steps.length) {
        renderStep();
      } else {
        submitMonster();
      }
    });
  });
}

function submitMonster() {
  fetch('/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(monsterData)
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        try {
          const data = JSON.parse(text);
          throw new Error(data.message || 'Failed to create monster');
        } catch {
          throw new Error(text || 'Failed to create monster');
        }
      });
    }
    return res.json();
  })
  .then(data => {
    window.location.href = '/';
  })
  .catch(err => {
    console.error(err);
    alert('Something went wrong: ' + err.message);
  });
}