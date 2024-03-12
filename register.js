document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById('username');
    usernameInput.focus(); // Set focus on username input field on page load
});

function registerUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const notification = document.getElementById('notification');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const phoneNumber = phoneNumberInput.value;

    // Regular expressions for validation
    const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@$%^&*!]{1,8}$/;
    const passwordRegex = /^\d{3,5}$/;

    // Check if any field is empty
    if (!username || !password || !phoneNumber) {
        notification.textContent = 'Enter all fields.';
        return;
    }

    // Check if all credentials meet the criteria
    if (usernameRegex.test(username) && passwordRegex.test(password) && /^\d{10}$/.test(phoneNumber)) {
        // Display success message
        notification.textContent = 'You have registered!';
    } else {
        if (!usernameRegex.test(username)) {
            notification.textContent += 'Enter a valid username. It should contain 1 capital letter, 2 numbers, 1 special character, and be less than or equal to 8 characters. ';
        }
        if (!passwordRegex.test(password)) {
            notification.textContent += 'Enter a valid password. It should be a numeric value with a minimum of 3 and a maximum of 5 digits. ';
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            notification.textContent += 'Enter a valid Indian mobile number (10 digits).';
        }
    }

}


module.exports = { registerUser};