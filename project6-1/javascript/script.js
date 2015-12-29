var val = document.querySelector('.screen');
var decimalAdded = false;
var counted = false;
var operators = ['+', '-', 'x', '÷'];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var str, lastChar;

function key(k) {
    if (!counted) {
        val.innerHTML += k;
    } else {
        val.innerHTML = k;
    }
    counted = false;
}

function count() {
    val.innerHTML = parseFloat(eval(val.innerHTML).toFixed(12));
    counted = true;
}

function clearVal() {
    val.innerHTML = "";
}

function clearLastChar() {
    str = val.innerHTML;
    val.innerHTML = str.substring(0, str.length - 1);
}

function sinVal() {
    val.innerHTML = parseFloat(Math.sin(val.innerHTML * Math.PI / 180).toFixed(12));
    counted = true;
}

function cosVal() {
    val.innerHTML = parseFloat(Math.cos(val.innerHTML * Math.PI / 180).toFixed(12));
    counted = true;
}

function square() {
    val.innerHTML = Math.pow(val.innerHTML, 2);
    counted = true;
}

function sqrt1() {
    val.innerHTML = Math.sqrt(val.innerHTML);
    counted = true;
}

function operate(k) {
    str = val.innerHTML;
    lastChar = str.slice(-1);

    if (str != '' && numbers.indexOf(lastChar) > -1)
        val.innerHTML += k;
    // 如果输入框的值为空且按钮为减号
    if (str == '' && k == ' - ')
        val.innerHTML += k;
    // 如果输入框最后一位为操作符，且输入框的值长度大于1
    if (operators.indexOf(lastChar) > -1 && str.length > 1) {
        // 替换最后一位为按钮的值
        val.innerHTML = val.innerHTML.replace(/.$/, k);
    }
    decimalAdded = false;
    counted = false;
}

function point() {
    str = val.innerHTML;
    lastChar = str.slice(-1);
    if (!decimalAdded && str != '' && numbers.indexOf(lastChar) > -1) {
        val.innerHTML += '.';
        decimalAdded = true;
    }
}
