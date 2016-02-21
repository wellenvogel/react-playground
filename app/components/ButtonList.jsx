/**
 * Created by andreas on 08.02.16.
 */
var React=require('react');
var Button=require('./Button.jsx');
var stclasses=require('./ButtonList.scss');
var Settings=require("../stores/Settings.jsx");
/**
 * the button bar
 * properties
 *   buttons the list of button objects, each: onClick, icon
 *   top: leave room for the top toolbar
 */
module.exports=React.createClass({
    propTypes:{
        top: React.PropTypes.bool,
        button: React.PropTypes.array
    },
    getDefaultProps(){
        return{
            float: false
        };
    },
    render: function(){
        var buttons=this.props.buttons;
        var cl=stclasses.buttonListFloat;
        var style={
          width: Settings.getButtonListWidth()
        };
        if (this.props.top) style.top=Settings.getToolBarHeight();
        return(
            <div className={cl} {...this.props} style={style}>
                {buttons.map(function(entry) {
                        return <Button {...entry}></Button>;
                    }
                )}

            </div>
        );

    }
});