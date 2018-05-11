import React from 'react';

class Display extends React.Component {

    render() {
        return (
            <div className="calculator__display">{ this.props.displayNum }</div>
        )
    }
}

export default Display