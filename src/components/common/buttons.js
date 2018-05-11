import React from 'react';

class Buttons extends React.Component {

    constructor() {
        super();

        this.state = {
            operator: "",
            key: "",
            clear: "AC"
        }

    }

    render() {
        return(
            <div className="calculator__keys" onClick={ this.props.onClick }>
                <button className="key--operator" data-action="add">+</button>
                <button className="key--operator" data-action="subtract">-</button>
                <button className="key--operator" data-action="multiply">&times;</button>
                <button className="key--operator" data-action="divide">÷</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>0</button>
                <button data-action="decimal">.</button>
                <button data-action="clear">{ this.state.clear }</button>
                <button className="key--equal" data-action="calculate">=</button>
            </div>
        )
    }
}

export default Buttons