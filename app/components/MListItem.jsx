/**
 * Created by andreas on 18.02.16.
 * a blueprint how to wrap material ui components to ensure that we can set all the styles
 */

var React=require('react');
var ListItem=require('material-ui/lib/lists/list-item');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');


module.exports=React.createClass({
    propTypes: {
        borderBottom: React.PropTypes.bool
    },
    contextTypes: {
        muiTheme: React.PropTypes.object
    },
    getInitialState: function () {
        return({
            muiTheme: this.context.muiTheme||getMuiTheme.default
        });
    },
    render: function(){
        var style={
            fontSize: Settings.getFontBase()
        };
        var finalStyle=extend({},this.props.style,style);
        var item=<ListItem {...this.props} style={finalStyle}>{this.props.children}</ListItem>;
        if (this.props.borderBottom) {
            return (
                <div style={{borderBottom: '1px solid '+this.state.muiTheme.tableRow.borderColor}}>
                    {item}
                </div>
            );
        }
        return(
            item
        );
    }
});