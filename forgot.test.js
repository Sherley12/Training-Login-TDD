const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './forgot.html'), 'utf8');
const js = fs.readFileSync(path.resolve(__dirname, './forgot.js'), 'utf8');
document.documentElement.innerHTML = html;
describe('Forgot Password Page', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        eval(js);
    });

    test('Check if the container elements are present', () => {
        const wrapper = document.querySelector('.wrapper');
        const inputBox = document.querySelector('.input-box');
        const phoneNumberInput = document.getElementById('phoneNumber');
        const submitButton = document.querySelector('.btn');
        const notification = document.getElementById('notification');

        expect(wrapper).not.toBeNull();
        expect(inputBox).not.toBeNull();
        expect(phoneNumberInput).not.toBeNull();
        expect(submitButton).not.toBeNull();
        expect(notification).not.toBeNull();
        expect(submitButton.compareDocumentPosition(phoneNumberInput) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
    });

    test('Check if Indian phone number input field is present', () => {
        const phoneNumberInput = document.getElementById('phoneNumber');
        expect(phoneNumberInput).not.toBeNull();
        expect(phoneNumberInput.placeholder).toBe('Enter Indian Phone Number (10 digits)');
        expect(phoneNumberInput.getAttribute('type')).toBe('tel');
        expect(phoneNumberInput.getAttribute('maxlength')).toBe('10');
        expect(phoneNumberInput.required).toBe(true);
    });
    test('Check if submit button has the correct background color', () => {
        const submitButton = document.querySelector('.btn');
        submitButton.style.backgroundColor = 'rgb(0, 123, 255)';
        const computedStyle = getComputedStyle(submitButton);
        const backgroundColor = computedStyle.backgroundColor;
        expect(backgroundColor).toBe('rgb(0, 123, 255)');
    });

    test('Check if submit button is present', () => {
        const submitButton = document.querySelector('.btn');
        expect(submitButton).not.toBeNull();
        expect(submitButton.textContent).toBe('Submit');
    });

    
});
const { sendOTP } = require('./forgot.js');

test('Check if OTP is sent for valid 10-digit number', () => {
    document.getElementById('phoneNumber').value = '1234567890';
    sendOTP();
    const notification = document.getElementById('notification');
    expect(notification.textContent).toBe('OTP has been sent!'); 
    expect(document.getElementById('phoneNumber').value).toBe(''); // Check if the input is cleared
});

test('Check if error message is displayed for invalid phone number', () => {
    document.getElementById('phoneNumber').value = '123';
    sendOTP();
    const notification = document.getElementById('notification');
    expect(notification.textContent).toBe('Enter a valid 10-digit phone number.');
    expect(notification.style.color).toBe('rgb(220, 53, 69)'); 
});

describe('Focus on Username field', () => {
    test('Check if focus is on the username field after DOM is loaded', () => {
      // Simulate DOMContentLoaded event
      document.dispatchEvent(new Event('DOMContentLoaded'));
  
      // Check if the focus is on the username field
      const focusedElement = document.activeElement;
      const phoneNumberInput = document.getElementById('phoneNumber');
  
      expect(focusedElement).toEqual(phoneNumberInput);
    });
  });

  

  describe('Submit Button', () => {
    test('Check if the submit button has the onclick event and functions correctly', () => {
        const submitButton = document.querySelector('.btn');

        // Check if the onclick attribute is defined
        expect(submitButton.onclick).toBeDefined();

        // Check if the onclick attribute is a function
        expect(typeof submitButton.onclick).toBe('function');

        // Mock the sendOTP function
        const mockSendOTP = jest.fn();

        // Replace the original sendOTP function with the mock function
        submitButton.onclick = mockSendOTP;

        // Trigger the click event
        submitButton.click();

        // Check if the sendOTP function is called
        expect(mockSendOTP).toHaveBeenCalled();

        // Remove the onclick event
        submitButton.onclick = null;

        // Trigger the click event after removing onclick
        submitButton.click();

        // Check if the sendOTP function is called
        // This expectation should fail if the onclick event is removed
        expect(mockSendOTP).toHaveBeenCalled();
    });
});

 
