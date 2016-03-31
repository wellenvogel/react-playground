import React from "react";
import css from "./PopUpList.scss";

var PopUpList=React.createClass({
    propTypes:{
        options: React.PropTypes.array,
        selected: React.PropTypes.number,
        visible: React.PropTypes.bool,
        parent: React.PropTypes.node,
        selectCallback: React.PropTypes.func,
        headline: React.PropTypes.string,
        item: React.PropTypes.string, //the name of the item to be displayed
    },
    getDefaultProps:function(){
        return {
            visible: false,
            headline: "Select",
            item: "caption"
        } ;
    },
    getInitialState:function(){
        return{
            selected: this.props.selected||0,
        }
    },
    select: function(index){
        this.setState({selected:index});
        this.props.selectCallback(index);
    },
    render: function(){
        //TODO: compute position from parent
        var style={
            left: 0,
            bottom: 0,
            display: this.props.visible?"block":"none"
        };
        var idx=0;
        var self=this;
        return(
            <div className={css.container+" card"} data-z="3" style={style}>
                <div className={css.headline} onClick={function(){self.select(-1)}}>{this.props.headline}<i className={css.close}></i></div>
                <ul className="list">
                { this.props.options.map(function(el){
                    var itemIndex=idx;
                    var className=css.unselected;
                    var displayValue=(typeof(el) === "string")?el:el[self.props.item];
                    if (itemIndex == self.state.selected) className=css.selected;
                    idx++;
                    return( <li className={className} onClick={function(){
                            self.select(itemIndex);
                        }}><span className="item-text">{displayValue}</span></li>);
                })}
                </ul>
            </div>
        );
    },
    componentDidUpdate: function(){
        this._move();
    },
    componentDidMount: function(){
        this._move();
    },
    _move: function() {
        if (this.props.parent === undefined)return;
        var parentPos= $(this.props.parent.getDOMNode()).offset();
        var dom=this.getDOMNode();
        var dheight=$(window).height();
        var ownHeight=$(dom).height();
        var bottom=dheight-parentPos.top;
        if ((bottom + ownHeight) > dheight){
            bottom=(ownHeight > dheight)?0:dheight-ownHeight;
        }
        $(dom).css('left',parentPos.left+"px");
        $(dom).css('bottom',bottom+"px");
        $(dom).css('max-height',(dheight *0.9)+"px");
    }


});

module.exports=PopUpList;