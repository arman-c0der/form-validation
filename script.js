// Select input elements
const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const facebookInput = document.getElementById('facebook');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const form = document.getElementById('validationForm');

const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordGenMessage = document.getElementById('passwordGenMessage');

// Utility function to show validation
function showValidation(input, isValid, message = '') {
  const errorMessage = input.parentElement.parentElement.querySelector('.error-message');
  input.classList.remove('valid', 'invalid');
  if (isValid) {
    input.classList.add('valid');
    errorMessage.textContent = '';
  } else {
    input.classList.add('invalid');
    errorMessage.textContent = message;
  }
}

// Validators
function validateName(value) {
  return /^[A-Za-z\s]{3,30}$/.test(value);
}

function validateUsername(value) {
  return /^[A-Za-z0-9_]{4,16}$/.test(value);
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^(?:\+8801|01)[0-9]{9}$|^01[0-9]{3}-[0-9]{6}$/.test(value);
}

function validateFacebook(value) {
  return /^[a-zA-Z0-9._]{5,50}$/.test(value);
}

function validatePassword(value) {
  return value.length >= 8;
}

function updatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  let strength = '';
  let className = '';

  if (score < 30) {
    strength = 'Weak';
    className = 'weak';
  } else if (score < 60) {
    strength = 'Moderate';
    className = 'moderate';
  } else if (score < 80) {
    strength = 'Strong';
    className = 'strong';
  } else {
    strength = 'Very Strong';
    className = 'very-strong';
  }

  strengthBar.style.width = `${score}%`;
  strengthBar.className = `strength-bar ${className}`;
  strengthText.textContent = strength;
  strengthText.className = `strength-text ${className}`;
}

// Event listeners
nameInput.addEventListener('input', () =>
  showValidation(nameInput, validateName(nameInput.value), 'Name must be 3–30 letters only')
);
usernameInput.addEventListener('input', () =>
  showValidation(usernameInput, validateUsername(usernameInput.value), '4–16 characters, letters/numbers/_')
);
emailInput.addEventListener('input', () =>
  showValidation(emailInput, validateEmail(emailInput.value), 'Enter a valid email address')
);
phoneInput.addEventListener('input', () =>
  showValidation(phoneInput, validatePhone(phoneInput.value), 'Invalid Bangladeshi phone number')
);
facebookInput.addEventListener('input', () =>
  showValidation(facebookInput, validateFacebook(facebookInput.value), '5–50 valid slug characters')
);
passwordInput.addEventListener('input', () => {
  const valid = validatePassword(passwordInput.value);
  showValidation(passwordInput, valid, 'At least 8 characters required');
  updatePasswordStrength(passwordInput.value);
});

confirmPasswordInput.addEventListener('input', () => {
  const isMatch = confirmPasswordInput.value === passwordInput.value;
  showValidation(confirmPasswordInput, isMatch, 'Passwords do not match');
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', () => {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  toggleConfirmPassword.classList.toggle('fa-eye');
  toggleConfirmPassword.classList.toggle('fa-eye-slash');
});

// Password Generator
function generatePassword() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

generateBtn.addEventListener('click', () => {
  const newPassword = generatePassword();
  generatedPasswordInput.value = newPassword;
  passwordGenMessage.textContent = 'Password generated';
  passwordGenMessage.className = 'info-message password-gen-message success';
});

copyBtn.addEventListener('click', () => {
  const text = generatedPasswordInput.value;
  if (!text) return;

  navigator.clipboard.writeText(text).then(
    () => {
      passwordGenMessage.textContent = 'Copied to clipboard!';
      passwordGenMessage.className = 'info-message password-gen-message success';
    },
    () => {
      passwordGenMessage.textContent = 'Failed to copy';
      passwordGenMessage.className = 'info-message password-gen-message error';
    }
  );
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validations = [
    validateName(nameInput.value),
    validateUsername(usernameInput.value),
    validateEmail(emailInput.value),
    validatePhone(phoneInput.value),
    validateFacebook(facebookInput.value),
    validatePassword(passwordInput.value),
    confirmPasswordInput.value === passwordInput.value,
  ];

  if (validations.every(Boolean)) {
    alert('Form submitted successfully! ✅');
    form.reset();
    strengthBar.style.width = '0%';
    strengthText.textContent = 'Password strength';
    strengthText.className = 'strength-text default';
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach((input) => input.classList.remove('valid', 'invalid'));
  } else {
    alert('Please fix the errors before submitting ❌');
  }
});
