/**
 * Created by andreas on 18.02.16.
 * a blueprint how to wrap material ui components to ensure that we can set all the styles
 */

var React=require('react');
var ListItem=require('react-toolbox/lib/list/ListItem.js');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');


module.exports=React.createClass({
    propTypes: {
        borderBottom: React.PropTypes.bool
    },
    render: function(){
        var item=<div {...this.props}>{this.props.children}</div>;
        if (this.props.borderBottom) {
            return (
                <div style={{borderBottom: '1px solid grey'}}>
                    {item}
                </div>
            );
        }
        return(
            item
        );
    }
});