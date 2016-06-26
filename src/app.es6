import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory, RouteHandler} from 'react-router'
import {createStore} from 'redux'

var Home = React.createClass({
    render: function(){
        return(
            <div>
                <p>Welcome home, user.</p>
            </div>
        );
    }
});



var TemplateLayout = React.createClass({
    render: function() {
        return (<div>
            <span>Header:</span>
            <Link to="/">Home</Link> |
            <hr/>
            <div>
            <h2>Body Content</h2>
        {this.props.children}
    </div>
    <div><hr/>footer</div>
    </div>);
}
});

ReactDOM.render((
    <Router>
        <Route component={TemplateLayout}>
            <Route path="/" component={Home} />
        </Route>
    </Router>
), document.getElementById('userApp'));