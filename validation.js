const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success colour
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//checkRequired fields
function checkRequired(inputArr) {
    // console.log(inputArr);
    inputArr.forEach(function(input){
        if (input.value.trim() === '') {
            showError(input,`${getFieldName(input)} is required`)
        } else {
            showSucces(input);
        }
    });
}


//get username => Username
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//check email is valid
function checkEmail(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.value.trim())) {
        showSucces(input)
    } else {
        showError(input,'Email is not invalid');
    }
}


//check input Length
function checkLength(input, min ,max) {

    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    }else {
        showSucces(input);
    }
}


// check passwords match
function checkPasswordMatch(password, password2) {
    if(password.value !== password2.value) {
        showError(password2, 'Passwords do not match');
    }
}

//checkRequired fields
function getFromInput(inputArr) {
    const inputs = {};
    inputArr.forEach(function(input){
        inputs[input.id] = input.value;
    });
    registerUser(inputs);
}

function registerUser(data) {
    // call api to stote into database
    console.log(data);
}

//Event Listeners
form.addEventListener('submit',function(event) {
    event.preventDefault();
    checkRequired([
        username,
        email,
        password,
        password2
    ]);

    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

    getFromInput([
        username,
        email,
        password,
        password2
    ]);
});
