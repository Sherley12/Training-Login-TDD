document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById('phoneNumber');
    usernameInput.focus(); // Set focus on username input field on page load
});
function sendOTP() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const notification = document.getElementById('notification');

    const phoneNumber = phoneNumberInput.value;

    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        // Simulating OTP sent notification
        notification.textContent = 'OTP has been sent!';
        notification.style.color = '#28a745';
        phoneNumberInput.value = ''; // Clear the input after sending OTP (simulated)
    } else {
        // Display error message for invalid phone number
        notification.textContent = 'Enter a valid 10-digit phone number.';
        notification.style.color = '#dc3545';
    }
}

module.exports = { sendOTP };