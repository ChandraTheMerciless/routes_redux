var NewUser = React.createClass({
        render: function(){
            return(
                <button onClick={this.props.dispatchItem}>Dispatch</button>
            );
        }
});

export default NewUser;