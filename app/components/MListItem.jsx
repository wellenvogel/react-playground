/**
 * Created by andreas on 18.02.16.
 * a blueprint how to wrap material ui components to ensure that we can set all the styles
 */

var React=require('react');
var ListItem=require('material-ui/lib/lists/list-item');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');


module.exports=React.createClass({
    render: function(){
        var style={
            fontSize: Settings.getFontBase()
        };
        var finalStyle=extend({},this.props.style,style);
        return(
            <ListItem {...this.props} style={finalStyle}>{this.children}</ListItem>
        );
    }
});