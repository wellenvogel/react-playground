/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');

module.exports=React.createClass({
    propTypes:{
        onClick:    React.PropTypes.func.isRequired,
        icon:       React.PropTypes.string.isRequired
    },
    render: function(){
        return(
            <button type="button" className="avn_button" onClick={this.clickHandler}>
                <span className={"icon-"+this.props.icon+" icon"}></span>
            </button>
        );
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    }
});
