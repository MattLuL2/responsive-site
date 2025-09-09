function calculate(num1,num2,operation){
    if (operation == "add") {
        return num1 + num2;
    } else if (operation == "subtract") {
        return num1 - num2;
    } else if (operation == "multiply") {
        return num1 * num2;
    } else if (operation == "divide") {
        return num1 / num2;
    } else {
        return "Invalid operation";
    }
}

function calculateAndDisplay(){
    const num1 = parseFloat(document.getElementById("firstnum").value);
    const num2 = parseFloat(document.getElementById("secondnum").value);
    const operation = document.getElementById("operation").value;
    
    var sign;
    if (operation == "add") {
        sign = "+";
    }
    else if (operation == "subtract") {
        sign = "-";
    }
    else if (operation == "multiply") {
        sign = "*";
    }
    else if (operation == "divide") {
        sign = "/";
    }
    
    const result = calculate(num1,num2,operation);
    document.getElementById("result").innerHTML = `${num1} ${sign} ${num2} = ${result}`;
}