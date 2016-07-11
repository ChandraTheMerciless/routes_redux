"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var NewUser = React.createClass({
    displayName: "NewUser",

    render: function render() {
        return React.createElement(
            "button",
            { onClick: this.props.dispatchItem },
            "Dispatch"
        );
    }
});

exports.default = NewUser;