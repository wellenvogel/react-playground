/**
 * Created by andreas on 18.02.16.
 * a panel that contains the whole parent
 */

var React=require('react');
var Settings=require('../stores/Settings.jsx');

/**
 * a panel
 * properties:
 *  scrollable {boolean}
 *  bottom {boolean} leave room for a bottom panel
 *  buttons {boolean} leave room for the buttons on the right
 *  top {boolean} leave room for the top bar
 */
module.exports=React.createClass({
    propTypes: {
        scrollable: React.PropTypes.bool,
        bottom: React.PropTypes.bool,
        buttons: React.PropTypes.bool
    },
    render: function(){
        var style={
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };
        if (this.props.scrollable) style.overflow="auto";
        if (this.props.bottom) style.bottom=Settings.getBottomPanelHeight();
        if (this.props.buttons) style.right=Settings.getButtonListWidth();
        if (this.props.top) style.top=Settings.getToolBarHeight();
        return(
            <div {...this.props}  style={style}>
                {this.props.children}
            </div>
        );
    }
});