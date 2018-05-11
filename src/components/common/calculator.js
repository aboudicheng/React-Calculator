import React from 'react';
import ReactDOM from 'react-dom'
import Buttons from './buttons'
import Display from './display'

const getKeyType = (key) => {
    
    const { action } = key.dataset

    if (!action)
        return "number"
    if (action === "add" || action === "subtract" || action === "multiply" || action === "divide" ) 
        return "operator"
    // For everything else, return the action
    return action
}

// const createResultString = (key, displayNum, state) => {

//     const keyContent = key.innerHTML;
//     const { action } = key.dataset;
//     const { firstV, operator, previousKeyType, modValue } = state;
//     const keyType = getKeyType(key);

//     if (keyType === "number") {

//         //Do not print 0 again if 0 is clicked, and clear the display when user clicks any operator
//         return (num === "0" || previousKeyType === "operator" || previousKeyType === "calculate")
//             ? keyContent

//             //concatenate the displayed number with the new number
//             : num + keyContent;

//     }

//     if (keyType === "decimal") {

//         if (!num.includes("."))
//             return num + ".";
//         if (previousKeyType === "operator" || previousKeyType === "calculate")
//             return "0.";
//         return num;

//     }

//     if (keyType === "operator") {

//         //if first value & operator already exist (ex: 100 - 1 action)
//         return (firstV && operator && previousKeyType !== "operator" && previousKeyType !== "calculate")
//             ? calculate(firstV, num, operator)
//             : num;

//     }
//     if (keyType === "clear") {
//         return 0;
//     }
//     if (keyType === "calculate") {
//         if (firstV) {
//             return (previousKeyType === "calculate")
//                 ? calculate(num, modValue, operator)
//                 : calculate(firstV, num, operator);
//         }
//         else
//             return num;
//     }

// }

class Calculator extends React.Component {
    constructor() {
        super();

        this.state = {
            displayNum: "0",
            key: ""
        };

        this.handleClick = this.handleClick.bind(this);
        //this.createResultString = this.createResultString.bind(this);
    }

    handleClick(e) {
        //key gets the whole element
        const key = e.target;
        const displayNum = this.state.displayNum;
        this.setState({ key: key });

        const content = key.innerHTML
        const keyType = getKeyType(key);

        console.log(keyType);
        console.log(content);
    }

    

    render() {
        return (
            <div className="calculator">
                <Display displayNum={this.state.displayNum} />
                <Buttons onClick={this.handleClick} />
            </div>
        );
    }
}

export default Calculator