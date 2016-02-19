/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');
var TButton=require('muicss/lib/react/button');
var Settings=require('../stores/Settings.jsx');
var extend=require('lodash/extend');

var style=require('./Button.scss');


module.exports=React.createClass({
    propTypes:{
        onClick:    React.PropTypes.func.isRequired,
        icon:       React.PropTypes.string,
        muiIcon:    React.PropTypes.string
    },
    render: function(){
        return(
            <TButton className={style.button} onClick={this.clickHandler} variant="fab">
                {this.props.icon?<span className={"icon-"+this.props.icon}></span>:undefined }
                {this.props.muiIcon?<i className="material-icons">{this.props.muiIcon}</i>:undefined}
            </TButton>
        );
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    }
});
