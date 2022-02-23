//Practice

document.getElementById('user-number').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        writeNumbers();
    }
})

function writeNumbers() {
    zeroeFields();
    let userNumber = parseInt(document.getElementById('user-number').value);
    if (Number.isNaN(userNumber)||(userNumber <=5 )) {
       alert("The number must be greater than 5!");
       document.getElementById('user-number').value = '';
    }
    else if (!(userNumber % 10)) {
        alert("The number must not be a multiple of 10!");
        document.getElementById('user-number').value = '';
    }
    else {
        let mod = userNumber % 10;
        let numberSum=document.getElementsByClassName('number-sum');
        let numberDiff=document.getElementsByClassName('number-diff');
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

for (let i=0; i <=2; i++) {
    document.getElementsByClassName('check-answers')[i].addEventListener('click', function (){
        if (checkAnswers[i]()) {
            document.getElementsByClassName('check-answers')[i].setAttribute("style", "background-color: rgb(3, 250, 24)");
            } else {
            document.getElementsByClassName('check-answers')[i].setAttribute("style", "background-color: red");
        }
    });
}

let checkAnswers = [];

for (let i = 0; i <= 2; i++) {
    checkAnswers.push(function (){ 
        let numberSum = parseInt(document.getElementsByClassName('number-sum')[0].textContent);
        let ones = numberSum % 10;
        let tens = numberSum - ones;
        let correct = true;
        let squareTen = document.getElementsByClassName('square-tens')[i];
        if (squareTen.value != tens**2) {
            correct = false;
            return correct;
        }

        if (i != 1) {
            let j;
            if (i == 0) {
                j = 0;
            } else if (i == 2){
                j = 1;
            }
            let productTwice = document.getElementsByClassName('product-twice')[j];
            if (productTwice.value != 2 * tens * ones) {
                correct = false;
                return correct;
            }
        }
        
        let squareOne = document.getElementsByClassName('square-ones')[i];
            if (squareOne.value != ones**2) {
                correct = false;
                return correct;
            }
    
        if (i === 0){           
            let resultSum = parseInt(document.getElementById('result-sum').value);
            if (resultSum !== tens**2 + 2 * tens * ones + ones**2) {
                correct = false;
                return correct;
            }
        } else if (i === 1){      
            let resultConjugate = parseInt(document.getElementById('result-conjugate').value);
            if (resultConjugate !== tens**2 - ones**2) {
                correct = false;
                return correct;
            }
        } else if (i === 2){
            let resultDiff =parseInt(document.getElementById('result-diff').value);
            if (resultDiff !== tens**2 - 2 * tens * ones + ones**2) {
                correct = false;
                return correct;
            }              
        }
        return correct;
    })
}

function zeroeFields() {
    
    let numberSum=document.getElementsByClassName('number-sum');
    let numberDiff=document.getElementsByClassName('number-diff');
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

    let checkAnswers = document.getElementsByClassName('check-answers');
    for (let checkAnswer of checkAnswers) {
        checkAnswer.removeAttribute("style");
    }
}

//Challenge
let started = false;
document.getElementById('start-game').addEventListener('click', function (){
    if (!started) {
        started = true;
        document.getElementById("answer-box").addEventListener('keydown', function(event){
            if (event.key === 'Enter') {
                checkAnswer();
            }
        })
        writeQuestion();
    } else {
        alert("You already started the challenge! Answer the question!")
    } 
});

function generateQuestion() {
    let num1;
    let num2;
    do {
        let tens = Math.floor(Math.random() * 10) + 1;
        let ones = Math.floor(Math.random() * 9) + 1;
        num1 = tens * 10 + ones;
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

function writeQuestion () {
    let num = generateQuestion();
    document.getElementById('first-number').innerText = num[0];
    if (num[0]===num[1]) {       
        document.getElementById('exponent').innerText = 2;
        document.getElementById('multiply-sign').innerText = '';
        document.getElementById('second-number').innerText = '';
    } else {
        document.getElementById('exponent').innerText = '';
        document.getElementById('multiply-sign').innerText = ' x ';
        document.getElementById('second-number').innerText = num[1];
    }
}

function checkAnswer () {
    let firstNumber = parseInt(document.getElementById('first-number').textContent);
    let secondNumber = parseInt(document.getElementById('second-number').textContent);
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    incrementTotalAnswers();
    if (Number.isNaN(secondNumber)) {
        let rightAnswer = firstNumber ** 2;
        if (rightAnswer != userAnswer) {
            document.getElementById('answer-box').setAttribute("style", "background-color: red");
        } else {
            document.getElementById('answer-box').setAttribute("style", "background-color: rgb(3, 250, 24)");
            incrementCorrectAnswers();
        }
    } else {
        let rightAnswer = firstNumber * secondNumber;
        if (rightAnswer != userAnswer) {
            document.getElementById('answer-box').setAttribute("style", "background-color: red");
        } else {
            document.getElementById('answer-box').setAttribute("style", "background-color: rgb(3, 250, 24)");
            incrementCorrectAnswers();
        }
    }
    document.getElementById('answer-box').value='';
    document.getElementById('answer-box').focus();   
    writeQuestion();
    }

function incrementCorrectAnswers () {
    let correct = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++correct;
    
}

function incrementTotalAnswers () {
    let total = parseInt(document.getElementById('total').innerText);
    document.getElementById('total').innerText = ++total;
}
