/**
 * Created by andreas on 07.02.16.
 */

var React=require('react');
var Modal=require('react-bootstrap/lib/Modal.js');
//var Button=require('react-bootstrap/lib/Button.js');
var Button=require('../components/Button.jsx');
var update = require('react-addons-update');
var assign=require('object-assign');

var Alert=React.createClass({
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
        var cancelBtn=null;
        if (this.props.cancelIcon) {
            cancelBtn=<Button onClick={this.cancel} icon={this.props.cancelIcon}></Button>;
        }

        return(
            <Modal show={true} >
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    {cancelBtn}
                    <Button onClick={this.ok} icon={this.props.okIcon}></Button>
                </Modal.Footer>
            </Modal>
        );
    },
    clickHandler: function(event){
        return this.props.onClick(event);
    }
});
var AlertListInstance=null;
var AlertList=React.createClass({
    getInitialState:function(){
        return({
            alerts:[],
            num: 0
        });
    },
    render: function(){
        return(
            <div>
                {this.state.alerts.map(function(item){
                    return item;
                })}
            </div>
        );
    },
    add: function(options){
        this.setState(function(previousState,props) {
            var newNum=previousState.num+1;
            return ({
                alerts: update(previousState.alerts, {
                    $push: [
                        <Alert {...options} num={newNum}
                               close={this.remove}></Alert>
                    ]
                }),
                num: newNum
            });
        });
    },
    remove: function(num){
        this.setState(function(previousState,props){
            return({
                alerts: update(previousState.alerts,{$splice:[[num-1,1]]}),
                num: previousState.num-1
            });
        });
    },
    componentDidMount: function(){
        AlertListInstance=this;
    }
});


module.exports= {
    /**
     * create an alert
     * returns a promise that fulfills if the user clicks ok
     * @param options {object}
     *        okIcon - set the icon name for OK
     *        showCancel - show a cancel button
     *        cancelIcon - use this icon for cancel
     */
    alert: function(options){
            if (typeof options === "string"){
                var noptions={
                    title: "Alert",
                    body: <p>{options}</p>
                };
                options=noptions;
            }
            return new Promise(function (resolve, reject) {
                if (AlertListInstance == null) {
                    window.setTimeout(reject(new Error("not initialzed")), 0);
                    return;
                }
                var finalOptions = assign({}, options, {okCallback: resolve, cancelCallback: reject});
                if (!finalOptions.okIcon) finalOptions.okIcon = "checkmark";
                if (finalOptions.showCancel && !finalOptions.cancelIcon) finalOptions.cancelIcon = "arrow-left2";
                AlertListInstance.add(finalOptions);
            });
    },
    /**
     * render the single list of alerts
     * @param target {object}
     *        DOM element to render to
     */
    render: function(target){
        if (AlertListInstance != null){
            throw new Error("you can only render alertList once");
        }
        React.render(
            <AlertList></AlertList>,
            target
        );
    }
};
