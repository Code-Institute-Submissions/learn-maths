document.getElementById('user-number').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        writeNumbers()
    }
})

function writeNumbers() {
    let userNumber = parseInt(document.getElementById('user-number').value);
    let mod = userNumber % 10;
    console.log(userNumber);
    let numberSum=document.getElementsByClassName('number-sum');
    console.log(numberSum);
    let numberDiff=document.getElementsByClassName('number-diff');
    console.log(numberDiff);
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