function validate(username, password) {
    // Regular expressions for validation
    const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@$%^&*!]{1,8}$/;
    const passwordRegex = /^\d{3,5}$/;

    // Check if both username and password are empty
    if (username.trim() === "" && password.trim() === "") {
        alert("Empty username and empty password not accepted.");
        return;
    }

    // Check if username is empty
    if (username.trim() === "") {
        alert("Empty username not accepted.");
        return;
    }

    // Check if password is empty
    if (password.trim() === "") {
        alert("Empty password not accepted.");
        return;
    }
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = passwordRegex.test(password);
    if (isUsernameValid && isPasswordValid) {
        window.location.href = 'https://www.google.co.in/';
        return;
    } else {
        // Check if both username and password do not meet the criteria
        alert("Username and password do not meet the criteria.");
        return;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Username').focus();
});
module.exports = validate;
