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
        var cn=this.props.scrollable?"avFlexGrowScroll":"avFlexGrow";

        return(
            <div {...this.props} className={cn}>
                {this.props.children}
            </div>
        );
    }
});