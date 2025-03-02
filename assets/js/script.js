// JavaScript for LearnSphere

// Basic password obfuscation
function obfuscatePassword(password) {
    return btoa(password.split('').reverse().join(''));
}

// Registration Form Validation
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
	registrationForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const username = document.getElementById('username').value.trim();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('password').value;
		const confirmPassword = document.getElementById('confirm-password').value;

		// Basic validation
		if (!username || !email || !password || !confirmPassword) {
			alert('Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Password strength check
		if (password.length < 8) {
			alert('Password must be at least 8 characters long');
			return;
		}

		// Check if user already exists
		const existingUser = localStorage.getItem('userData');
		if (existingUser) {
			const parsedUser = JSON.parse(existingUser);
			if (parsedUser.email === email) {
				alert('User with this email already exists!');
				return;
			}
		}

		// Store user data in localStorage
		const userData = {
			username: username,
			email: email,
			password: obfuscatePassword(password)
		};

		try {
			localStorage.setItem('userData', JSON.stringify(userData));
			alert('Registration successful!');
			window.location.href = 'login.html';
		} catch (error) {
			alert('Error saving user data. Please try again.');
			console.error('Registration error:', error);
		}
	});
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
	loginForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const email = document.getElementById('email').value.trim();
		const password = document.getElementById('password').value;

		// Basic validation
		if (!email || !password) {
			alert('Please fill in all fields');
			return;
		}

		// Retrieve user data from localStorage
		let storedData;
		try {
			storedData = localStorage.getItem('userData');
			if (!storedData) {
				alert('No registered user found!');
				return;
			}

			const userData = JSON.parse(storedData);
			
			// Compare obfuscated passwords
			if (email === userData.email && obfuscatePassword(password) === userData.password) {
				// Create session
				sessionStorage.setItem('isLoggedIn', 'true');
				sessionStorage.setItem('currentUser', JSON.stringify({
					username: userData.username,
					email: userData.email
				}));
				
				alert('Login successful!');
				window.location.href = 'topic-selection.html';
			} else {
				alert('Invalid email or password!');
			}
		} catch (error) {
			alert('Error during login. Please try again.');
			console.error('Login error:', error);
		}
	});
}

// Check session on page load
function checkSession() {
	const isLoggedIn = sessionStorage.getItem('isLoggedIn');
	if (isLoggedIn === 'true') {
		const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		console.log('User is logged in:', currentUser);
	}
}

// Run session check when the script loads
checkSession();

// Subject Selection
const gradeButtons = document.querySelectorAll('.grade-btn');
const subjectButtons = document.querySelectorAll('.subject-btn');

if (gradeButtons.length > 0) {
	gradeButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Store selected grade
			localStorage.setItem('selectedGrade', this.dataset.grade);
			// Highlight selected grade
			gradeButtons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');
		});
	});
}

if (subjectButtons.length > 0) {
	subjectButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Store selected subject
			localStorage.setItem('selectedSubject', this.dataset.subject);
			// Highlight selected subject
			subjectButtons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');
		});
	});
}

// Content Navigation
const contentButtons = document.querySelectorAll('.content-btn');
const contentDisplay = document.querySelector('.content-display');

if (contentButtons.length > 0) {
	contentButtons.forEach(button => {
		button.addEventListener('click', function() {
			const contentType = this.dataset.content;
			// Here you would load the appropriate content
			contentDisplay.innerHTML = `<p>${contentType.charAt(0).toUpperCase() + contentType.slice(1)} content will be displayed here.</p>`;
		});
	});
}