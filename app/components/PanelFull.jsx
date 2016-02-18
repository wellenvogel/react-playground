/**
 * Created by andreas on 18.02.16.
 * a panel that contains the whole parent
 */

var React=require('react');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');


module.exports=React.createClass({
    propTypes: {
        scrollable: React.PropTypes.bool,
        noTop: React.PropTypes.bool,
        noBottom: React.PropTypes.bool
    },
    render: function(){
        var style={
            position: 'absolute',
            overflow: this.props.scrollable?'auto':'hidden',
            left: 0,
            right: 0
        };
        if (! this.props.noBottom) style.bottom=0;
        if (! this.props.noTop) style.top=0;
        var finalStyle=extend({},style,this.props.style);
        return(
            <div {...this.props} style={finalStyle}>
                {this.props.children}
            </div>
        );
    }
});