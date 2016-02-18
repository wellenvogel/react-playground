/**
 * Created by andreas on 08.02.16.
 */
var React=require('react');
var Button=require('./Button.jsx');
var Settings=require('../stores/Settings.jsx');
module.exports=React.createClass({
    render: function(){
        var buttons=this.props.buttons;
        var style={
            position: 'absolute',
            top:0,
            right:0,
            width: Settings.getButtonSize()+5
        };
        return(
            <div style={style}>
                {buttons.map(function(entry) {
                        return <Button {...entry}></Button>;
                    }
                )}

            </div>
        );

    }
});