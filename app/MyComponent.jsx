/**
 * Created by andreas on 28.01.16.
 */
var Store=require('./Store.jsx');
var React=require('react');

module.exports=React.createClass({
    render: function(){
        console.log("MyComponent:render");
        return (
            <h1>{this.props.prefix}:{this.state.text}</h1>
        );
    },
    getInitialState: function(){
        return {text: "Initial"};
    },
    change: function(o) {
        console.log("change called");
        this.setState(o);
    },
    componentDidMount: function(x){
        Store.register(this);
    }

});



