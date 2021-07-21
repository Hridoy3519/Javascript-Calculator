const output = document.getElementById('output');
const buttons = document.getElementsByClassName('buttons');

let string = "";

function doMath(x, y, operator) {
    if (operator === '/') {
        return x / y;
    }

    else if (operator === '*') {
        return x * y;
    }
    else if (operator === '+') {
        return x + y;
    }

    else {
        return x - y;
    }
}

function solve(array, char) {
    nowArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === char) {
            let prev = nowArray[nowArray.length - 1];
            prev = doMath(prev, array[++i], char);
            nowArray.pop();
            nowArray.push(prev);
        }
        else {
            nowArray.push(array[i]);
        }
    }
    return nowArray;
}

function giveResult(string) {

    let array = [];
    for (let i = 0; i < string.length; i++) {
        let now = parseFloat(string[i]);
        while (string[i + 1] >= '0' && string[i + 1] <= '9') {
            now = now * 10 + parseFloat(string[i + 1]);
            i++;
        }
        array.push(now);
        if (i + 1 < string.length) array.push(string[++i]);
    }

    array = solve(array, '/');
    array = solve(array, '*');
    array = solve(array, '+');
    array = solve(array, '-');
    output.textContent = array[0];

}

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (event) {
        const pressedButton = event.target.innerText;

        if (pressedButton == '=') {
            giveResult(string);
            string = "";
        }
        else if (pressedButton == 'C') {
            string = "";
            output.textContent = 0;
        }
        else {
            string += pressedButton;
            output.textContent = string;
        }
    })
}
