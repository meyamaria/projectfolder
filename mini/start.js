document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const loginPopup = document.querySelector(".cover_box");
    const btnLoginPopup = document.querySelector(".btnLogin-popup");
    const btnClose = document.querySelector(".icon-close");
    const registerLink = document.querySelector(".register-link");
    const loginLink = document.querySelector(".login-link");

    // Open login/signup popup
    btnLoginPopup.addEventListener("click", function () {
        loginPopup.classList.add("active-popup");
    });

    // Close popup
    btnClose.addEventListener("click", function () {
        loginPopup.classList.remove("active-popup");
    });

    // Toggle between login and register forms
    registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginPopup.classList.add("active");
    });

    loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginPopup.classList.remove("active");
    });

    // Register User
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("username", username);

        alert("Registration successful! You can now log in.");
        
        // After successful registration, redirect:
        window.location.href = "http://localhost:5173/";
    });

    // Login User
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("isLoggedIn", "true");
            // After successful login, redirect to the target URL:
            window.location.href = "http://localhost:5173/";
        } else {
            alert("Invalid email or password. Try again.");
        }
    });
});

// Function to Open Modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Function to Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
};