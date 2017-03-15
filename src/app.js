console.log('it works');

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>ListShare</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

// ReactDOM.render(
// <Router path="/" history={browserHistory}>
// 	<Route path="/${USERS UNIQUE ID}" component= {UniqueList}
// </Router>, document.getElementById('app'));