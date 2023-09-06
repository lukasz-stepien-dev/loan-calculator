//#TO-DO limits

const loanPurpose = document.querySelector('#loan-purpose');
const amount = document.querySelector('#amount');
const numberOfInstallments = document.querySelector('#installments');
const rateTypes = [
    document.querySelector('#seven'),
    document.querySelector('#eight'),
    document.querySelector('#nine')
];

console.log(amount.value);

function isNotEmpty() {
    let intAmount = parseInt(amount.value);
    let intInstallments = parseInt(numberOfInstallments.value);
    let errors = '';
    let isErrors = false;
    if (
        loanPurpose.value === 'empty' && isNaN(intAmount) && isNaN(intInstallments)) {
        alert('Wypełnij pola!');
        return false;
    } else {

        if (loanPurpose.value === 'empty') {
            errors += 'Wypełnij cel kredytu\n';
            isErrors = true;
        }
        if (isNaN(intAmount)) {
            errors += 'Wpisz kwote kredytu\n';
            isErrors = true;
        }
        if (isNaN(intInstallments)) {
            errors += 'Wpisz liczbe rat\n';
            isErrors = true;
        }

        if (isErrors) {
            alert(errors);
            return false;
        }
    }

    return true;
}

function checkValues() {
    let intAmount = parseInt(amount.value);
    let intInstallments = parseInt(numberOfInstallments.value);
    let errors = '';
    let isErrors = false;
    if (intAmount > 250000 || intAmount < 5000) {
        errors += 'Wpisz poprawną kwotę kredytu\n';
        isErrors = true;
    }
    if (intInstallments > 64 || intInstallments < 6) {
        errors += 'Wpisz poprawną liczbę rat\n';
        isErrors = true;
    }
    if (isErrors) {
        alert(errors);
        return false;
    }
    return true;
}

function getRate() {
    if (rateTypes[0].checked) {
        return 0.076;
    } else if (rateTypes[1].checked) {
        return 0.083;
    } else if (rateTypes[2].checked) {
        return 0.095;
    }
}

function getPurpose() {
    const purposes = ['Wycieczka', 'Zakup samochodu', 'Remont mieszkania', 'Inny'];
    return purposes[loanPurpose.selectedIndex];
}
document.querySelector('#calculate').addEventListener('click', () => {
    if (isNotEmpty() && checkValues()) {
        const k = 12;
        let info = '';
        let intAmount = parseInt(amount.value);
        let intInstallments = parseInt(numberOfInstallments.value);
        let numeral = intAmount * getRate();
        let denominator = k * (1 - ( Math.pow(k / (k + getRate()), intInstallments)))
        let sum = numeral / denominator;
        console.log(sum);
        sum = Math.round(sum * 100) / 100;
        alert(
            `Cel kredytu: ${getPurpose()}
            Kwota kredytu ${intAmount}zł
            Liczba rat: ${intInstallments}
            Oprocentowanie: ${getRate()*100}
            Wysokość raty: ${sum}`
        );
    }
});