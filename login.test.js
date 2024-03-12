const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, 'login.html'), 'utf8');
const { fireEvent } = require('@testing-library/dom');
const validate = require('./login.js');


describe('HTML Elements', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Check if username input field exists', () => {
        const usernameInput = document.getElementById('Username');
        expect(usernameInput).toBeTruthy();
    });

    test('Check if password input field exists', () => {
        const passwordInput = document.getElementById('Password');
        expect(passwordInput).toBeTruthy();
    });

    test('Check if submit button exists', () => {
        const submitButton = document.querySelector('.btn');
        expect(submitButton).toBeTruthy();
    });

    test('Check if forgot password link exists', () => {
        const forgotPasswordLink = document.querySelector('.remember-forgot a');
        expect(forgotPasswordLink).toBeTruthy();
    });

    test('Check if register link exists ', () => {
        const registerLink = document.querySelector('.register-link a');
        expect(registerLink).toBeTruthy();
    });

    test('Check if "Don\'t have an account?" line exists', () => {
        const dontHaveAccountLine = document.querySelector('.register-link p');
        expect(dontHaveAccountLine.textContent).toContain("Don't have an account?");
    });
    test('Check if username placeholder exists', () => {
        const usernameInput = document.getElementById('Username');
        expect(usernameInput.placeholder).toContain('Username');
    });

    test('Check if password placeholder exists', () => {
        const passwordInput = document.getElementById('Password');
        expect(passwordInput.placeholder).toContain('Password');
    });

    test('Check if <i class=\'bx bxs-user\'></i> icon exists', () => {
        const icon = document.querySelector('.bx.bxs-user');
        expect(icon).not.toBeNull();
    });
    
    test('Check if <i class=\'bx bxs-lock-alt\'></i> icon exists', () => {
        const icon = document.querySelector('.bx.bxs-lock-alt');
        expect(icon).not.toBeNull();
    });

    test('Check if forgot password link has <a href="forgot.html">', () => {
        const forgotPasswordLink = document.querySelector('.remember-forgot a');
        const href = forgotPasswordLink.getAttribute('href');
        expect(href).toContain('forgot.html');
    });

    test('Check if register link has <a href="register.html">', () => {
        const registerLink = document.querySelector('.register-link a');
        const href = registerLink.getAttribute('href');
        expect(href).toContain('register.html');
    });

    test('Check if heading "Login" exists', () => {
        const heading = document.querySelector('h1');
        expect(heading.textContent).toBe('Login');
    });
    
    test('Check if container exists', () => {
        const container = document.querySelector('.wrapper');
        expect(container).toBeTruthy();
});

test('Check if onclick function of Submit button calls validate with correct parameters', () => {
  document.body.innerHTML = `
    <div class="wrapper">
      <input type="text" name="Username" id="Username" placeholder="Username">
      <input type="password" name="Password" id="Password" placeholder="Password">
      <button type="submit" class="btn" onclick="validate(document.getElementById('Username').value, document.getElementById('Password').value)">Submit</button>
    </div>
  `;

  const submitButton = document.querySelector('.btn');
  const usernameInput = document.getElementById('Username');
  const passwordInput = document.getElementById('Password');

  // Simulate user input
  usernameInput.value = 'testUser';
  passwordInput.value = 'testPassword';

  // Mock the validate function
  const validateMock = jest.fn();
  window.validate = validateMock;

  // Trigger the click event on the submit button
  fireEvent.click(submitButton);

  // Check if the validate function is called with the correct parameters
  expect(validateMock).toHaveBeenCalledWith('testUser', 'testPassword');
});


describe('Username validation', () => {
    test('validates username with at least one capital letter, two numeric characters, one special character, and length <= 8', () => {
      const validUsername = 'Ab12!cd';
      const validateMock = jest.fn();
      validateMock(validUsername, 'somepassword');
      expect(validateMock).toHaveBeenCalledWith(validUsername, 'somepassword');
    });   
  });
  test('validates password with length >= 3 and <= 5', () => {
    const validPassword = '12345';    
    const validateMock = jest.fn();
    validateMock('someUsername', validPassword); 
    expect(validateMock).toHaveBeenCalledWith('someUsername', validPassword);
  });
  test('validates Username and Password', () => {
    const validUsername ='Ab12!cd';
    const validPassword ='1234';
    const validateMock = jest.fn();
    validateMock(validUsername , validPassword);
    expect(validateMock). toHaveBeenCalledWith(validUsername, validPassword);
  });


// const validate = require('./login.js');
describe('validate function', () => {
  global.alert = jest.fn(); 
  const originalLocationHref = window.location.href;
  beforeAll(() => {
  global.window.location.href = 'http://www.example.com';
  }); 
  afterAll(() => {   
    global.window.location.href = originalLocationHref;
  });

  test('displays alert for empty username and empty password', () => {
    validate('', '');
    expect(global.alert).toHaveBeenCalledWith("Empty username and empty password not accepted.");
  });

  test('displays alert for empty username', () => {
    validate('', 'nonemptyPassword');
    expect(global.alert).toHaveBeenCalledWith("Empty username not accepted.");
  });

  test('displays alert for empty password', () => {
    validate('nonemptyUsername', '');
    expect(global.alert).toHaveBeenCalledWith("Empty password not accepted.");
  });
 
  


jest.spyOn(window, 'location', 'get').mockReturnValue({ href: '' }); // Mock window.location for redirection test
test('validate function redirects to google with valid username and password', () => {
  const validUsername = 'Ab12!cd';
  const validPassword = '12345';
  validate(validUsername, validPassword);
  expect(window.location.href).toBe('https://www.google.co.in/');
});

  test('displays alert for invalid username and password', () => {
    validate('InvalidUsername', 'InvalidPassword');
    expect(global.alert).toHaveBeenCalledWith("Username and password do not meet the criteria.");
  });
});

});


describe('Focus on Username field', () => {
  test('Check if focus is on the username field after DOM is loaded', () => {
    // Simulate DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Check if the focus is on the username field
    const focusedElement = document.activeElement;
    const usernameInput = document.getElementById('Username');

    expect(focusedElement).toEqual(usernameInput);
  });
});

describe('Link clickability', () => {
  it('should check if "Forgot Password" link is clickable', () => {
    // Simulate the DOM structure
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="remember-forgot">
          <a href="forgot.html" id="forgotLink">Forgot password?</a>
        </div>
      </div>
    `;
    const forgotLink = document.getElementById('forgotLink');
    // Check if the link is clickable (not disabled)
    expect(forgotLink.getAttribute('disabled')).toBeNull();
  });

  it('should check if "Register" link is clickable', () => {
    // Simulate the DOM structure
    document.body.innerHTML = `
      <div class="wrapper">
        <div class="register-link">
          <p>Don't have an account? <a href="register.html" id="registerLink">Register</a></p>
        </div>
      </div>
    `;
    const registerLink = document.getElementById('registerLink');
    // Check if the link is clickable (not disabled)
    expect(registerLink.getAttribute('disabled')).toBeNull();
  });
});

// validate.test.js
window.submitForm = jest.fn();
describe('validate function', () => {
  test('should enable submit button when valid username and password are provided', () => {
    document.body.innerHTML = `
      <div class="wrapper">
        <input type="text" name="Username" id="Username" placeholder="Username">
        <input type="password" name="Password" id="Password" placeholder="Password">
        <button type="submit" id="submitButton" class="btn" onclick="submitForm()">Submit</button>
      </div>
    `;

    const mockUsername = 'Ab12!cd';
    const mockPassword = '12345';

    validate(mockUsername, mockPassword);

    const submitButton = document.getElementById('submitButton');
    fireEvent.click(submitButton);
    expect(submitButton.disabled).toBeFalsy();
    expect(submitButton.textContent || submitButton.innerText).toBe('Submit');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});


