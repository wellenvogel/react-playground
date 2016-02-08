/**
 * Created by andreas on 08.02.16.
 */
var React=require('react');
var Button=require('./Button.jsx');
module.exports=React.createClass({
    render: function(){
        var buttons=this.props.buttons;
        return(
            <div className='avn_right_panel'>
                {buttons.map(function(entry) {
                        return <Button {...entry}></Button>;
                    }
                )}

            </div>
        );

    }
});