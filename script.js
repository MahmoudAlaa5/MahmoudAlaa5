// Form validation configuration
const CONFIG = {
    emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: "<span>⚠</span>Invalid email! Please check your data.",
    emptyErrorMessage: "<span>⚠</span>Please fill in all fields."
};

// DOM elements
const elements = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    claimBtn: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    attachEventListeners();
});

// Initialize DOM elements
function initializeElements() {
    elements.firstName = document.querySelector('.input[placeholder*="First Name"]');
    elements.lastName = document.querySelector('.input[placeholder*="Last Name"]');
    elements.email = document.querySelector('.email');
    elements.password = document.querySelector('.input[placeholder*="Password"]');
    elements.claimBtn = document.querySelector('button');
}

// Attach event listeners
function attachEventListeners() {
    if (elements.claimBtn) {
        elements.claimBtn.addEventListener('click', handleFormSubmission);
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // First check if all inputs are filled
    if (!areAllInputsFilled()) {
        showEmptyError();
        return;
    }
    
    // Then validate email format
    if (isValidEmail(elements.email.value)) {
        handleValidInputs();
    } else {
        showError();
    }
}

// Check if all inputs are filled
function areAllInputsFilled() {
    const inputs = [
        elements.firstName,
        elements.lastName,
        elements.email,
        elements.password
    ];
    
    return inputs.every(input => input && input.value.trim() !== '');
}

// Validate email format
function isValidEmail(email) {
    return CONFIG.emailPattern.test(email);
}

// Handle valid Inputs
function handleValidInputs() {
    // Remove any existing errors first
    removeExistingErrors();
    
    // Create and display success message
    const successMessage = createSuccessMessage();
    elements.claimBtn.insertAdjacentElement('beforebegin', successMessage);
    
    return successMessage;
}

// Show error message for empty inputs
function showEmptyError() {
    // Remove existing errors
    removeExistingErrors();
    
    // Show empty error message
    const errorMessage = createErrorMessage(CONFIG.emptyErrorMessage);
    elements.claimBtn.insertAdjacentElement('beforebegin', errorMessage);
}

// Show error message for invalid email
function showError() {
    // Remove existing errors
    removeExistingErrors();
    
    // Show email validation error
    const errorMessage = createErrorMessage(CONFIG.errorMessage);
    elements.email.insertAdjacentElement('afterend', errorMessage);
}

// Remove existing error messages
function removeExistingErrors() {
    const existingErrors = document.querySelectorAll('.error');
    existingErrors.forEach(error => error.remove());
}

// Create error message element
function createErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error';
    errorMessage.innerHTML = message;
    errorMessage.classList.add('error');
    
    return errorMessage;
}


function createSuccessMessage() {
    const successMessage = document.createElement('p');
    successMessage.innerHTML = '<span>✅</span> Data Has Been Submitted Successfully!';
    successMessage.classList.add('success-validation');
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
    return successMessage;
}






