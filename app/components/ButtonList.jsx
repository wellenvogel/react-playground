/**
 * Created by andreas on 08.02.16.
 */
var React=require('react');
var Button=require('./Button.jsx');
var style=require('./ButtonList.scss');
module.exports=React.createClass({
    propTypes:{
        float: React.PropTypes.bool,
        button: React.PropTypes.array
    },
    getDefaultProps(){
        return{
            float: false
        };
    },
    render: function(){
        var buttons=this.props.buttons;
        var cl=this.props.float?style.buttonListFloat:style.buttonList;
        cl+=" avFlexColumn";
        return(
            <div className={cl} {...this.props}>
                {buttons.map(function(entry) {
                        return <Button {...entry}></Button>;
                    }
                )}

            </div>
        );

    }
});