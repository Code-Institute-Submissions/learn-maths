//Practice area

//Add event listener to user number input field in practice area
document.getElementById('user-number').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        writeNumbers();
    }
})

//Display sum squared, difference squared and conjugate product questions
function writeNumbers() {

    //Empty input fields
    zeroeFields();
    let userNumber = parseInt(document.getElementById('user-number').value);

    //Warnings for invalid user numbers
    if (Number.isNaN(userNumber) || (userNumber <= 5)) {
        alert("The number must be greater than 5!");
        document.getElementById('user-number').value = '';
    } else if (!(userNumber % 10)) {
        alert("The number must not be a multiple of 10!");
        document.getElementById('user-number').value = '';
    } else {

        //Display numbers in the three questions
        let mod = userNumber % 10;
        let numberSum = document.getElementsByClassName('number-sum');
        let numberDiff = document.getElementsByClassName('number-diff');
        if (mod <= 5) {
            for (let number of numberSum) {
                number.textContent = userNumber;
            }
            for (let number of numberDiff) {
                number.textContent = userNumber - 2 * mod;
            }
        } else {
            for (let number of numberDiff) {
                number.textContent = userNumber;
            }
            for (let number of numberSum) {
                number.textContent = userNumber + 2 * (10 - mod);
            }
        }
    }
}

//Add event listener to the three check answers buttons in practice area
for (let i = 0; i <= 2; i++) {
    document.getElementsByClassName('check-answers')[i].addEventListener('click', function () {
        //Color buttons according to answer
        if (checkAnswers[i]()) {
            document.getElementsByClassName('check-answers')[i].setAttribute("style", "background-color: rgb(3, 250, 24)");
        } else {
            document.getElementsByClassName('check-answers')[i].setAttribute("style", "background-color: red");
        }
    });
}

let checkAnswers = [];
//The three functions check the answer in all steps of the three calculation
//as well as in the final result
for (let i = 0; i <= 2; i++) {
    checkAnswers.push(function () {

        //Check the tens squared step in all three calculations
        let numberSum = parseInt(document.getElementsByClassName('number-sum')[0].textContent);
        let ones = numberSum % 10;
        let tens = numberSum - ones;
        let correct = true;
        let squareTen = document.getElementsByClassName('square-tens')[i];
        if (squareTen.value != tens ** 2) {
            correct = false;
            return correct;
        }

        //Check the double product step in sum squared and difference squared calculation
        if (i != 1) {
            let j;
            if (i == 0) {
                j = 0;
            } else if (i == 2) {
                j = 1;
            }
            let productTwice = document.getElementsByClassName('product-twice')[j];
            if (productTwice.value != 2 * tens * ones) {
                correct = false;
                return correct;
            }
        }

        //Check the ones squared step in all three calculations
        let squareOne = document.getElementsByClassName('square-ones')[i];
        if (squareOne.value != ones ** 2) {
            correct = false;
            return correct;
        }

        //Checks the final result in all three calculations
        if (i === 0) {
            let resultSum = parseInt(document.getElementById('result-sum').value);
            if (resultSum !== tens ** 2 + 2 * tens * ones + ones ** 2) {
                correct = false;
                return correct;
            }
        } else if (i === 1) {
            let resultConjugate = parseInt(document.getElementById('result-conjugate').value);
            if (resultConjugate !== tens ** 2 - ones ** 2) {
                correct = false;
                return correct;
            }
        } else if (i === 2) {
            let resultDiff = parseInt(document.getElementById('result-diff').value);
            if (resultDiff !== tens ** 2 - 2 * tens * ones + ones ** 2) {
                correct = false;
                return correct;
            }
        }
        return correct;
    })
}

//Empty all input fields in practice area
function zeroeFields() {

    let numberSum = document.getElementsByClassName('number-sum');
    let numberDiff = document.getElementsByClassName('number-diff');
    for (let number of numberSum) {
        number.textContent = '0';
    }
    for (let number of numberDiff) {
        number.textContent = '0';
    }

    let squareTens = document.getElementsByClassName('square-tens');
    for (let squareTen of squareTens) {
        squareTen.value = '';
    }

    let productTwices = document.getElementsByClassName('product-twice');
    for (let productTwice of productTwices) {
        productTwice.value = '';
    }

    let squareOnes = document.getElementsByClassName('square-ones');
    for (let squareOne of squareOnes) {
        squareOne.value = '';
    }

    let results = document.getElementsByClassName('result');
    for (let result of results) {
        result.value = '';
    }

    //Remove coloring of buttons
    let checkAnswers = document.getElementsByClassName('check-answers');
    for (let checkAnswer of checkAnswers) {
        checkAnswer.removeAttribute("style");
    }
}

//Challenge

//Add event listener to Start Game button in challenge area
let started = false;
document.getElementById('start-game').addEventListener('click', function () {
    if (!started) {
        started = true;

        //Add event listener to answer input field
        document.getElementById("answer-box").addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                checkAnswer();
            }
        })
        writeQuestion();

    //Warning if user starts the game again without answering
    } else {
        alert("You already started the challenge! Answer the question!")
    }
});

//Generates random number and random type of question
//(either a square or a conjugate product)
function generateQuestion() {
    let num1;
    let num2;
    do {
        //Generate random number
        let tens = Math.floor(Math.random() * 10) + 1;
        let ones = Math.floor(Math.random() * 9) + 1;
        num1 = tens * 10 + ones;

        //Generate random type of question (square or conjugate product)
        let calculateSquare = Math.floor(Math.random() * 2);
        if (calculateSquare) {
            num2 = num1;
        } else {
            if (ones <= 5) {
                num2 = num1 - 2 * ones;
            } else {
                num2 = num1 + 2 * (10 - ones);
            }
        }
    } while ((num2 < 11) || (num2 > 110));
    return [num1, num2];
}

//Display question in challenge area
function writeQuestion() {
    let num = generateQuestion();
    document.getElementById('first-number').innerText = num[0];

    //Square
    if (num[0] === num[1]) {
        document.getElementById('exponent').innerText = 2;
        document.getElementById('multiply-sign').innerText = '';
        document.getElementById('second-number').innerText = '';

    //Conjugate product
    } else {
        document.getElementById('exponent').innerText = '';
        document.getElementById('multiply-sign').innerText = ' x ';
        document.getElementById('second-number').innerText = num[1];
    }
}

// Check answer in challenge area
function checkAnswer() {
    let firstNumber = parseInt(document.getElementById('first-number').textContent);
    let secondNumber = parseInt(document.getElementById('second-number').textContent);
    let userAnswer = parseInt(document.getElementById('answer-box').value);

    //Increment number of trials
    incrementTotalAnswers();

    //Type of question is square
    if (Number.isNaN(secondNumber)) {
        let rightAnswer = firstNumber ** 2;
       
        if (rightAnswer != userAnswer) {

            //Answer box flashes red for 0.5 s
            document.getElementById('answer-box').setAttribute("style", "background-color: red");
            setTimeout(function () {
                document.getElementById('answer-box').removeAttribute("style");
            }, 500);
        } else {

            //Answer box flashes green for 0.5 s
            document.getElementById('answer-box').setAttribute("style", "background-color: rgb(3, 250, 24)");
            setTimeout(function () {
                document.getElementById('answer-box').removeAttribute("style");
            }, 500);

            //Increment score
            incrementCorrectAnswers();
        }
    //Type of question is conjugate product
    } else {
        let rightAnswer = firstNumber * secondNumber;
        if (rightAnswer != userAnswer) {

            //Answer box flashes red for 0.5 s
            document.getElementById('answer-box').setAttribute("style", "background-color: red");
            setTimeout(function () {               
                document.getElementById('answer-box').removeAttribute("style");
            }, 500);
        } else {

            //Answer box flashes green for 0.5 s
            document.getElementById('answer-box').setAttribute("style", "background-color: rgb(3, 250, 24)");
            
            //Increment score
            incrementCorrectAnswers();
            setTimeout(function () {
                document.getElementById('answer-box').removeAttribute("style");
            }, 500);
        }
    }
    //Empty answer input field
    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();
    writeQuestion();
}

//Increment score
function incrementCorrectAnswers() {
    let correct = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++correct;

}

//Increment number of trials
function incrementTotalAnswers() {
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerText = ++total;
}