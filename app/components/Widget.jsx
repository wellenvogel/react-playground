/**
 * Created by andreas on 23.02.16.
 */

var React=require("react");
var csstyle=require("./Widget.scss");
var NavStore=require("../stores/NavStore.jsx");

var Widget=React.createClass({
    propTypes:{
        wkey: React.PropTypes.string,
        wunit: React.PropTypes.string,
        wcaption: React.PropTypes.string,
        width: React.PropTypes.number,
        wformatter: React.PropTypes.func
    },
    getInitialState: function(){
        return{
            val:NavStore.getValue(this.props.wkey)
        };
    },
    onChange: function(){
        var v=NavStore.getValue(this.props.wkey);
        if (v != this.state.val){
            this.setState({val:v});
        }
    },
    componentWillMount: function(){
        NavStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        NavStore.removeChangeListener(this.onChange);
    },
    render: function(){
        return (
          <div className={csstyle.widget} draggable {...this.props}>
              <div className={csstyle.caption}>{this.props.wcaption}</div>
              <div>
                  <span className={csstyle.main}>{this.props.wformatter(this.state.val)}</span>
                  <span className={csstyle.unit}>{this.props.wunit}</span>
              </div>
          </div>
        );
    }

});

module.exports=Widget;