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

document.getElementById('start-game').addEventListener('click', function (){
    document.getElementById("answer-box").addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })
    runGame();
});

function runGame () {
    generateQuestion ();
    writeQuestion ();
}

function generateQuestion() {
    let num1;
    let num2;
    if (square) {
        num2 = num1;
    } else {
        let mod = num1 % 10;
        if (mod <= 5) {
            num2 = num1 - 2 * mod;
        } else {
         num2 = num1 + 2 * (10 - mod);
        }
    }     
}

function writeQuestion () {

}

function checkAnswer () {
    runGame ();
}

function incrementCorrectAnswers () {

}

function incrementIncorrectAnswers () {

}
