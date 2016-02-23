/**
 * Created by andreas on 08.02.16.
 */
var React=require('react');
var Settings=require("../stores/Settings.jsx");
/**
 * the button bar
 * properties
 *   buttons the list of button objects, each: onClick, icon
 *   top: leave room for the top toolbar
 */
module.exports=React.createClass({
    propTypes:{
        buttonLeft: React.PropTypes.object,
        label: React.PropTypes.string
    },
    getDefaultProps(){
        return{
            float: false
        };
    },
    render: function(){
        return(
            <div className={"toolbar color-white "+Settings.getToolBarColor()}>
                <button className="icon-button">
                    <i className="material-icons">{this.props.buttonLeft}</i>
                </button>
                <span className="toolbar-label">{this.props.label}</span>
                {this.props.children}
            </div>
        );

    }
});