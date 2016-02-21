/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');
var csstyle=require('./Button.scss');
var Settings=require("../stores/Settings.jsx");


module.exports=React.createClass({
    propTypes:{
        onClick:    React.PropTypes.func.isRequired,
        icon:       React.PropTypes.string,
        muiIcon:    React.PropTypes.string
    },
    render: function(){
        var style={
            fontSize: Settings.getButtonFontSize()
        }
        return(
            <button className={csstyle.button + " fab bg-red-500 color-white"} onClick={this.clickHandler} style={style}>
                {this.props.icon?<span className={"icon-"+this.props.icon}></span>:undefined }
                {this.props.muiIcon?<i className="material-icons">{this.props.muiIcon}</i>:undefined}
            </button>
        );
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    }
});
