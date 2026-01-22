    let firstNumber= "";
    let secondNumber= "";
    let operator="";

    function pressNumber(num)
    {
        if(operator === "")
        {
            firstNumber += num;
            document.getElementById("display").value = firstNumber;
        }
        else
        {
            secondNumber += num;
            document.getElementById("display").value = secondNumber;
        }
        }

        function setOperator(op)
        {
            operator=op;
        }

        function calculate()
        {
            let num1= parseFloat(firstNumber);
            let num2= parseFloat(secondNumber);
            let result;


        if (operator === "+") 
        {
            result = num1 + num2;
        } 
        else if (operator === "-") 
        {
            result = num1 - num2;
        } 
        else if (operator === "*") 
        {
            result = num1 * num2;
        } 
        else if (operator === "/") 
        {
            if (num2 === 0) 
            {
                display.value = "Error";
                return;
            }
            result = num1 / num2;
        }
        else
        {
            result= n1/n2;
        }

        document.getElementById("display").value = result;

        firstNumber=result.toString();
        secondNumber= "";
        operator="";

    }

    function clearAll()
    {
        firstNumber = "";
        secondNumber = "";
        operator="";
        document.getElementById("display").value = "";
    }



