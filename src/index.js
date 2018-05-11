import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/common/calculator'

import './index.css';

const App = () => {
    return (
        <div>
            <div className="container">
                <Calculator />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)