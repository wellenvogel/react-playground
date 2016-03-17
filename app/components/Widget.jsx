/**
 * Created by andreas on 23.02.16.
 */

var React=require("react");
var csstyle=require("./Widget.scss");

var Widget=React.createClass({
    propTypes:{
        wkey: React.PropTypes.string,
        wunit: React.PropTypes.string,
        wcaption: React.PropTypes.string,
    },
    render: function(){
        return (
          <div className={csstyle.widget} draggable {...this.props}>
              <div className={csstyle.caption}>{this.props.wcaption}</div>
              <div>
                  <span className={csstyle.main}>{this.props.wkey}</span>
                  <span className={csstyle.unit}>{this.props.wunit}</span>
              </div>
          </div>
        );
    }

});

module.exports=Widget;