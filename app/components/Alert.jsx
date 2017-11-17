/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');
var update = require('react-addons-update');
var assign=require('object-assign');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
var AlertListInstance=undefined;
var Alert=React.createClass({
    getInitialState: function(){
        return {

        };
    },
    ok: function(){
        if (this.props.close){
            this.props.close(this.props.num);
        }
        if (this.props.okCallback){
            this.props.okCallback();
        }
    },
    cancel: function(){
        if (this.props.close){
            this.props.close(this.props.num);
        }
        if (this.props.cancelCallback){
            this.props.cancelCallback();
        }
    },
    render: function(){
        if (! this.state.content) return null;
        return(
            <div ref="container" className="dialogContainer">
                <div ref="box" className="dialogBox">{this.state.content}</div>
            </div>
        );
    },
    show: function(content,properties){
        this.setState(Object.assign({},this.props,properties||{},{content:content}));
    },
    hide: function(){
        var oldState=this.state;
        if (oldState.cancelCallback){
            oldState.cancelCallback();
        }
        var newState={};
        for (var k in oldState){
            newState[k]=null;
        }
        this.setState(newState);
    },
    componentDidMount: function(){
        AlertListInstance=this;
    },
    componentWillUnmount: function(){
        var oldState=this.state;
        if (oldState.cancelCallback){
            oldState.cancelCallback();
        }
        AlertListInstance=undefined;
    },
    componentDidUpdate: function(){
        if (! this.state.content) return;
        var props=Object.assign({},this.props,this.state);
        if (props.positionCallback){
            props.positionCallback(this.refs.box);
        }
        else{
            Object.assign(this.refs.container.style, {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            var rect=this.refs.container.getBoundingClientRect();
            Object.assign(this.refs.box.style,{
                maxWidth: rect.width+"px",
                maxHeight: rect.height+"px",
                display: 'block',
                position: 'fixed'
            });
            var self=this;
            window.setTimeout(function(){
                var boxRect=self.refs.box.getBoundingClientRect();
                Object.assign(self.refs.box.style,{
                    left: (rect.width-boxRect.width)/2+"px",
                    top: (rect.height-boxRect.height)/2+"px",
                    opacity: 1
                });
            },0);
        }
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    },
    statics:{
        alert:function(text){
            return new Promise(function (resolve, reject) {
                var okFunction=function(el){
                    AlertListInstance.hide();
                    resolve();
                };
                var html=(
                    <div>
                        <h3 className="avn_dialogTitle">Alert</h3>
                        <div className="avn_dialogText">{text}</div>
                        <button name="ok" onClick={okFunction}>Ok</button>
                        <div className="avn_clear"></div>
                    </div>
                );
                if (AlertListInstance == null) {
                    reject(new Error("not initialzed"));
                    return;
                }
                AlertListInstance.show(html,{cancelCallback: function(){
                    resolve();
                }});
            });
        },
        hide: function(){
            if (AlertListInstance) AlertListInstance.hide();
        }
    }
});



module.exports= Alert;
