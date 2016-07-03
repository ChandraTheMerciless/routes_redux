import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, browserHistory, RouteHandler} from 'react-router'
import {createStore} from 'redux'
import NewUser from './new-user';


//try to refactor this out since Scott said that we don't need global var with redux??
var userList = [];

var userReducer = function(state, action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type === 'ADD_USER') {
        state = action.user;
    }
    return state;
};

// Create a store by passing in the reducer
var userStore = createStore(userReducer);



var Home = React.createClass({
    render: function(){
        return(
            <div>
                <p>Welcome home, user.</p>
            </div>
        );
    }
});

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list:[]};
        this.render = this.render.bind(this);
        //this.clickHandler = this.clickHandler.bind(this);
        this.reduxDispatch = this.reduxDispatch.bind(this);
    }

    componentDidMount() {
        var self = this;
        $.getJSON('/users.json').done(function (data) {
            userList = data.list;
            self.setState({
                list : data.list
            });
        });

         userStore.subscribe(function() {
             var tmpList = self.state.list;
             tmpList.push(userStore.getState());
             console.log("getState",userStore.getState());
             self.setState(tmpList);
         });
    }

    render(){
        var self = this;
        var list = this.state.list;
        return(
            <div>
                <ul>
                    {list.map(function(item, i) {
                        return <li>
                                  {item.name} - {item.email}
                               </li>
                    })}
                </ul>

                <div>
                  <label>Name </label>
                  <input type="text" id="new-user-name" />
                </div>
                <div>
                  <label>Email </label>
                  <input type="text" id="new-user-email" />
                </div>
                
                <NewUser dispatchItem={self.reduxDispatch}  />
            </div>
        )
    }

    reduxDispatch() {
      console.log('dispatched...');
      var newName = document.getElementById("new-user-name").value;
      var newEmail = document.getElementById("new-user-email").value;
      userStore.dispatch({
        type: 'ADD_USER',
        user: {name:newName, email:newEmail}
      });
    }
}

var TemplateLayout = React.createClass({
    render: function() {
        return (<div>
            <span>Header:</span>
            <Link to="/">Home</Link> |
            <Link to="/users">Users</Link>
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
            <Route path="/users" component={Users} />
        </Route>
    </Router>
), document.getElementById('userApp'));
