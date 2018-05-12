import React from 'react';
import Buttons from './buttons'
import Display from './display'

const calculate = (n1, n2, operator) => {
    let result;
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    if (operator === "add")
        result = n1 + n2;
    else if (operator === "subtract")
        result = n1 - n2;
    else if (operator === "multiply")
        result = n1 * n2;
    else
        result = n1 / n2;

    return result;
}

const getKeyType = (key) => {

    const { action } = key.dataset

    if (!action)
        return "number"
    if (action === "add" || action === "subtract" || action === "multiply" || action === "divide")
        return "operator"
    // For everything else, return the action
    return action
}


class Calculator extends React.Component {

    constructor() {
        super();

        this.state = {
            displayNum: "0",
            key: "",
            clear: "AC",
        };

    }

    createResultString = (key, displayNum, state) => {

        const keyContent = key.innerHTML;
        const { firstV, operator, previousKeyType, modValue } = state;
        const keyType = getKeyType(key);

        if (keyType === "number") {

            //Do not print 0 again if 0 is clicked, and clear the display when user clicks any operator
            return (displayNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate")
                ? keyContent

                //concatenate the displayed number with the new number
                : displayNum + keyContent;

        }

        if (keyType === "decimal") {

            if (!displayNum.includes("."))
                return displayNum + ".";
            if (previousKeyType === "operator" || previousKeyType === "calculate")
                return "0.";
            return displayNum;

        }

        if (keyType === "operator") {

            //if first value & operator already exist (ex: 100 - 1 action)
            return (firstV && operator && previousKeyType !== "operator" && previousKeyType !== "calculate")
                ? calculate(firstV, displayNum, operator)
                : displayNum;

        }
        if (keyType === "clear") {
            return "0";
        }
        if (keyType === "calculate") {
            if (firstV) {
                return (previousKeyType === "calculate")
                    ? calculate(displayNum, modValue, operator)
                    : calculate(firstV, displayNum, operator);
            }
            else
                return displayNum;
        }

    }

    updateCalculatorState = (key, calculator, resultString, displayNum) => {

        const keyType = getKeyType(key);
    
        const {
            firstV,
            operator,
            modValue,
            previousKeyType
        } = calculator.dataset
    
        calculator.dataset.previousKeyType = keyType;
    
        if (keyType === "operator") {
            calculator.dataset.operator = key.dataset.action
            calculator.dataset.firstV = (firstV &&
                operator &&
                previousKeyType !== "operator" &&
                previousKeyType !== "calculate")
                ? resultString
                : displayNum
        }
    
        if (keyType === "clear") {
    
            if (this.state.key === "AC") {
                calculator.dataset.firstV = "";
                calculator.dataset.operator = "";
                calculator.dataset.previousKeyType = "";
                calculator.dataset.modValue = "";
            }
            else {
                this.setState({clear: "AC"})
            }
    
    
        }
    
        if (keyType === "calculate") {
    
            calculator.dataset.modValue = (firstV && previousKeyType === "calculate")
                ? modValue
                : displayNum
    
        }
    }

    updateVisualState = (key, calculator) => {

        const keyType = getKeyType(key)
        Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"))
    
        if (keyType === "operator")
            key.classList.add("is-depressed")
    
        if (keyType === "clear" && this.state.key !== "AC") {
            this.setState({key: "AC"})
        }
    
        if (keyType !== "clear") {
            this.setState({clear: "CE"})
        }
    }

    handleClick = (e) => {
        //key gets the whole element
        const key = e.target;
        const displayNum = this.state.displayNum;
        this.setState({ key: key });

        const calculator = document.querySelector(".calculator");

        const resultString = this.createResultString(key, displayNum, calculator.dataset);
        this.setState({ displayNum: resultString });

        this.updateCalculatorState(key, calculator, resultString, displayNum)
        this.updateVisualState(key, calculator)

    }



    render() {
        return (
            <div className="calculator">
                <Display displayNum={this.state.displayNum} />
                <Buttons onClick={this.handleClick} clear={this.state.clear} />
            </div>
        );
    }
}

export default Calculator