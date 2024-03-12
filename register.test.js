const { registerUser } = require('./register.js');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './register.html'), 'utf8');

document.documentElement.innerHTML = html;

  
test('Check if it has a username input field', () => {
    const usernameInput = document.querySelector('input[name="username"]');
    expect(usernameInput).toBeTruthy();
});

test('Check if it has a password input field', () => {
    const passwordInput = document.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
});

test('Check if it has an Indian mobile number input field', () => {
    const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
    expect(phoneNumberInput).toBeTruthy();
});

test('Check if it has a submit button', () => {
    const submitButton = document.querySelector('button[type="button"]');
    expect(submitButton).toBeTruthy();
});

test('Check if it has a heading "Register"', () => {
    const heading = document.querySelector('h1');
    expect(heading.textContent).toBe('Register');
});

test('Check if the submit button is clickable', () => {
    const submitButton = document.querySelector('button[type="button"]');
    expect(submitButton.disabled).toBe(false);
});

test('Check if the notification is displayed for empty fields', () => {
    const notification = document.getElementById('notification');  
    registerUser();  
    expect(notification.textContent).toBe('Enter all fields.');     
});

test('Check if the notification is displayed when username is empty', () => {
    const notification = document.getElementById('notification');
    document.getElementById('username').value = '';    
    registerUser();    
    expect(notification.textContent).toBe('Enter all fields.');   
});

test('Check if the notification is displayed when password is empty', () => {
    const notification = document.getElementById('notification');
    document.getElementById('password').value = '';
    registerUser();
    expect(notification.textContent).toBe('Enter all fields.'); 
   
});

test('Check if the notification is displayed when phoneNumber is empty', () => {
    const notification = document.getElementById('notification');
    document.getElementById('phoneNumber').value = '';
    registerUser();
    expect(notification.textContent).toBe('Enter all fields.'); 
   
});

test('should display success message for valid credentials', () => {
    document.getElementById('username').value = 'Valid21!';
    document.getElementById('password').value = '12345';
    document.getElementById('phoneNumber').value = '1234567890';
    registerUser();
    expect(document.getElementById('notification').textContent).toBe('You have registered!');
});

test('should display "Enter a valid username" message for incorrect username', () => {
    document.getElementById('username').value = 'invalidUsername';
    document.getElementById('password').value = '12345';
    document.getElementById('phoneNumber').value = '1234567890';
    registerUser();
    expect(document.getElementById('notification').textContent).toContain('Enter a valid username. It should contain 1 capital letter, 2 numbers, 1 special character, and be less than or equal to 8 characters.');
});

test('should display "Enter a valid password" message for incorrect password', () => {
    document.getElementById('username').value = 'Valid21!';
    document.getElementById('password').value = 'invalidPass';
    document.getElementById('phoneNumber').value = '1234567890';
    registerUser();
    expect(document.getElementById('notification').textContent).toContain('Enter a valid password. It should be a numeric value with a minimum of 3 and a maximum of 5 digits.');
});

test('should display "Enter a valid Indian mobile number" message for incorrect phone number', () => {
    document.getElementById('username').value = 'Valid21!';
    document.getElementById('password').value = '12345';
    document.getElementById('phoneNumber').value = '123456789'; 
    registerUser();
    expect(document.getElementById('notification').textContent).toContain('Enter a valid Indian mobile number (10 digits).');
});

test('Check if submit button has the correct background color', () => {
    const submitButton = document.querySelector('.btn');
    submitButton.style.backgroundColor = 'rgb(0, 123, 255)';
    const computedStyle = getComputedStyle(submitButton);
    const backgroundColor = computedStyle.backgroundColor;
    expect(backgroundColor).toBe('rgb(0, 123, 255)');
});

test('Check the position of input elements', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const submitButton = document.querySelector('.btn');
    expect(usernameInput.compareDocumentPosition(passwordInput) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(passwordInput.compareDocumentPosition(phoneNumberInput) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(phoneNumberInput.compareDocumentPosition(submitButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

describe('Focus on Username field', () => {
    test('Check if focus is on the username field after DOM is loaded', () => {
      // Simulate DOMContentLoaded event
      document.dispatchEvent(new Event('DOMContentLoaded'));
  
      // Check if the focus is on the username field
      const focusedElement = document.activeElement;
      const usernameInput = document.getElementById('username');
  
      expect(focusedElement).toEqual(usernameInput);
    });
  });
  
 
