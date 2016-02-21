/**
 * Created by andreas on 18.02.16.
 * a panel that contains the whole parent
 */

var React=require('react');
var extend = require('lodash/extend');
var style=require("./Page.scss");


module.exports=React.createClass({
    propTypes: {

    },
    render: function(){
        return(
            <div {...this.props} className={style.page + " avFlexColumn"}>
                {this.props.children}
            </div>
        );
    }
});