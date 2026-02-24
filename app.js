document.addEventListener("DOMContentLoaded", function () {

    let displayValue = "0";
    let firstNumber = null;
    let operator = null;
    let waitingForSecond = false;

    const result = document.getElementById("result");
    const history = document.getElementById("history");

    function updateDisplay() {
        result.textContent = displayValue;
        history.textContent = firstNumber ? firstNumber + " " + operator : "";
    }

    function inputNumber(num) {
        if (waitingForSecond) {
            displayValue = num;
            waitingForSecond = false;
        } else {
            displayValue = displayValue === "0" ? num : displayValue + num;
        }
    }

    function inputDecimal() {
        if (!displayValue.includes(".")) {
            displayValue += ".";
        }
    }

    function setOperator(op) {
        firstNumber = parseFloat(displayValue);
        operator = op;
        waitingForSecond = true;
    }

    function calculate() {
        let secondNumber = parseFloat(displayValue);
        let answer = 0;

        if (operator === "+") answer = firstNumber + secondNumber;
        if (operator === "-") answer = firstNumber - secondNumber;
        if (operator === "*") answer = firstNumber * secondNumber;
        if (operator === "/") answer = firstNumber / secondNumber;
        if (operator === "%") answer = firstNumber % secondNumber;

        displayValue = answer.toString();
        firstNumber = null;
        operator = null;
    }

    function clearCalculator() {
        displayValue = "0";
        firstNumber = null;
        operator = null;
        waitingForSecond = false;
        history.textContent = "";
    }

    document.querySelectorAll(".calculator-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let value = btn.dataset.value;

            if (value >= "0" && value <= "9") inputNumber(value);
            else if (value === ".") inputDecimal();
            else if (["+", "-", "*", "/", "%"].includes(value)) setOperator(value);

            if (btn.id === "equals") calculate();
            if (btn.id === "clear") clearCalculator();
            if (btn.id === "clear-entry") displayValue = "0";

            updateDisplay();
        });
    });

    updateDisplay();

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            document.getElementById("nameError").style.display = name ? "none" : "block";
            document.getElementById("emailError").style.display = email ? "none" : "block";
            document.getElementById("messageError").style.display = message ? "none" : "block";

            if (name && email && message) {
                alert("Message sent successfully!");
                contactForm.reset();
            }
        });
    }

});
