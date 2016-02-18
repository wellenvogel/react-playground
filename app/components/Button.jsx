/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');
var FloatingActionButton=require('material-ui/lib/floating-action-button');
var Settings=require('../stores/Settings.jsx');
var extend=require('lodash/extend');


module.exports=React.createClass({
    propTypes:{
        onClick:    React.PropTypes.func.isRequired,
        icon:       React.PropTypes.string.isRequired
    },
    render: function(){
        var bSize=Settings.getButtonSize();
        var styleBase={
            width: bSize,
            height: bSize,
            lineHeight: bSize+"px"
        };
        var style=extend({},styleBase,{marginBottom:bSize*0.1});
        return(
            <FloatingActionButton style={style} iconStyle={styleBase} iconClassName={"icon-"+this.props.icon} onClick={this.clickHandler}>
            </FloatingActionButton>
        );
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    }
});
