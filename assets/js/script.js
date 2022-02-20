document.getElementById('user-number').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        writeNumbers()
    }
})

function writeNumbers() {
    let userNumber = parseInt(document.getElementById('user-number').value);
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

document.getElementById('check-answers').addEventListener('click', function (){
    if (checkAnswers()) {
        alert("Well done! You can either practice more or go to the challenge section below");
        zeroeFields();
    } else {
        alert("Something is wrong! Try to correct your answers");
    }
});

function checkAnswers (){
    let numberSum = parseInt(document.getElementsByClassName('number-sum')[0].textContent);
    let ones = numberSum % 10;
    let tens = numberSum - ones;

    let correct = true;

    let squareTens = document.getElementsByClassName('square-tens');
    for (let squareTen of squareTens) {
        if (squareTen.value != tens**2) {
            correct = false;
            return correct;
        }
    } 

    let productTwices = document.getElementsByClassName('product-twice');
    for (let productTwice of productTwices) {
        if (productTwice.value != 2 * tens * ones) {
            correct = false;
            return correct;
        }
    }

    let squareOnes = document.getElementsByClassName('square-ones');
    for (let squareOne of squareOnes) {
        if (squareOne.value != ones**2) {
            correct = false;
            return correct;
        }
    }

    let resultSum = document.getElementById('result-sum').value;
    if (resultSum != tens**2 + 2 * tens * ones + ones**2) {
        correct = false;
        return correct;
    }

    let resultConjugate = document.getElementById('result-conjugate').value;
    if (resultConjugate != tens**2 - ones**2) {
        correct = false;
        return correct;
    }

    let resultDiff = document.getElementById('result-diff').value;
    if (resultDiff != tens**2 - 2 * tens * ones + ones**2) {
        correct = false;
        return correct;
    }

    return correct;
}

function zeroeFields() {
    document.getElementById('user-number').value = '';
    document.getElementById('user-number').focus();

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
    

    document.getElementById('result-sum').value = '';

    document.getElementById('result-conjugate').value = '';

    document.getElementById('result-diff').value = '';
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
    let tens = Math.floor(Math.random() * 10) + 1;
    let ones = Math.floor(Math.random() * 9) + 1;
    let num1 = tens * 10 + ones;
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
    return [num1, num2]     
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
    if (Number.isNaN(secondNumber)) {
        let rightAnswer = firstNumber ** 2;
        if (rightAnswer != userAnswer) {
            alert(`Wrong answer: You answered ${userAnswer}. The correct answer was  ${rightAnswer}!`);
        } else {
            alert("Well done!");
        }
    } else {
        let rightAnswer = firstNumber * secondNumber;
        if (rightAnswer != userAnswer) {
            alert(`Wrong answer: You answered ${userAnswer}. The correct answer was  ${rightAnswer}!`);
        } else {
            alert("Well done!");
        }
    }
    document.getElementById('answer-box').value='';
    document.getElementById('answer-box').focus();   
    writeQuestion();
    }

function incrementCorrectAnswers () {

}

function incrementIncorrectAnswers () {

}
