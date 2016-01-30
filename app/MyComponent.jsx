/**
 * Created by andreas on 28.01.16.
 */
import Store from './Store.jsx';
import React from 'react';

module.exports = React.createClass({
    render: function(){
        return (
            <h1>{this.props.prefix}:{this.state.text}</h1>
        );
    },
    getInitialState: function(){
        return {text: "Initial"};
    },
    change: function(o) {
        this.setState(o);
    },
    componentDidMount: function(x){
        console.log("mounted "+this);
        Store.register(this);
    }

});



