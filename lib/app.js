'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _redux = require('redux');

var _newUser = require('./new-user');

var _newUser2 = _interopRequireDefault(_newUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//try to refactor this out since Scott said that we don't need global var with redux??
var userList = [];

var userReducer = function userReducer(state, action) {
    if (state === undefined) {
        state = [];
    }
    if (action.type === 'ADD_USER') {
        state = action.user;
    }
    return state;
};

// Create a store by passing in the reducer
var userStore = (0, _redux.createStore)(userReducer);

var Home = _react2.default.createClass({
    displayName: 'Home',

    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                null,
                'Welcome home, user.'
            )
        );
    }
});

var Users = function (_React$Component) {
    _inherits(Users, _React$Component);

    function Users(props) {
        _classCallCheck(this, Users);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Users).call(this, props));

        _this.state = { list: [] };
        _this.render = _this.render.bind(_this);
        //this.clickHandler = this.clickHandler.bind(this);
        _this.reduxDispatch = _this.reduxDispatch.bind(_this);
        return _this;
    }

    _createClass(Users, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;
            $.getJSON('/users.json').done(function (data) {
                userList = data.list;
                self.setState({
                    list: data.list
                });
            });

            userStore.subscribe(function () {
                var tmpList = self.state.list;
                tmpList.push(userStore.getState());
                console.log("getState", userStore.getState());
                self.setState(tmpList);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var self = this;
            var list = this.state.list;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    null,
                    list.map(function (item, i) {
                        return _react2.default.createElement(
                            'li',
                            null,
                            item.name,
                            ' - ',
                            item.email
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Name '
                    ),
                    _react2.default.createElement('input', { type: 'text', id: 'new-user-name' })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Email '
                    ),
                    _react2.default.createElement('input', { type: 'text', id: 'new-user-email' })
                ),
                _react2.default.createElement(_newUser2.default, { dispatchItem: self.reduxDispatch })
            );
        }
    }, {
        key: 'reduxDispatch',
        value: function reduxDispatch() {
            console.log('dispatched...');
            var newName = document.getElementById("new-user-name").value;
            var newEmail = document.getElementById("new-user-email").value;
            userStore.dispatch({
                type: 'ADD_USER',
                user: { name: newName, email: newEmail }
            });
        }
    }]);

    return Users;
}(_react2.default.Component);

var TemplateLayout = _react2.default.createClass({
    displayName: 'TemplateLayout',

    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'span',
                null,
                'Header:'
            ),
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
            ),
            ' |',
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/users' },
                'Users'
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Body Content'
                ),
                this.props.children
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('hr', null),
                'footer'
            )
        );
    }
});

ReactDOM.render(_react2.default.createElement(
    _reactRouter.Router,
    null,
    _react2.default.createElement(
        _reactRouter.Route,
        { component: TemplateLayout },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: Home }),
        _react2.default.createElement(_reactRouter.Route, { path: '/users', component: Users })
    )
), document.getElementById('userApp'));