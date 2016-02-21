/**
 * Created by andreas on 09.02.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var FullPanel=require("../components/PanelFull.jsx");
var Page=require("../components/Page.jsx");
var Location=require("../util/Location.jsx");
var Alert=require("../components/Alert.jsx").alert;
var style=require('./Status.scss');

var statusIcons= {
    INACTIVE: require("../css/images/GreyBubble40.png"),
    STARTED: require("../css/images/YellowBubble40.png"),
    RUNNING: require("../css/images/YellowBubble40.png"),
    NMEA:   require("../css/images/GreenBubble40.png"),
    ERROR: require("../css/images/RedBubble40.png")
};

var WorkerStatus=React.createClass({
    render: function(){
        var item=this.props.item;
        var icon=statusIcons[item.status||"INACTIVE"]||statusIcons.INACTIVE;
        return(
            <li className={style.workerStatus}>
                <img className="item-icon" src={icon}></img>
                <div className="item-text">
                    <span >{item.name}</span>
                    <span className="secondary-text">{item.info}</span>
                </div>
            </li>
        );
    }
});
var StatusEntry=React.createClass({
    render: function(){
        var base=this.props.status.configname;
        var hasSub=this.props.status.info.items.length?true:false;
        return(

            <li className="section">
                <div className="item-text">{base}</div>
                <ul className="list">
                    { this.props.status.info.items.map(function (entry) {
                        return (<WorkerStatus key={base+entry.name} item={entry}>
                        </WorkerStatus>);
                    })
                    }
                </ul>
            </li>
        );
    }
});

module.exports=React.createClass({
    interval:0,
    getInitialState: function(){
        return{
            list: []
        }  ;
    },
    render: function(){
        return (
        <Page>
            <div className="toolbar bg-red-500 color-white">
                <button className="icon-button">
                    <i className="material-icons">menu</i>
                </button>
                <span className="toolbar-label">Server Status</span>
	            <span className="float-right">
		            <button className="icon-button"><i className="material-icons">search</i></button>
		            <button className="icon-button"><i className="material-icons">star</i></button>
	            </span>
            </div>
            <div className="avFlexRow">
                <FullPanel scrollable={true} className="panelMargin">
                    <ul className={style.topListStyle}>
                        {this.state.list.map(function (entry) {
                            return <StatusEntry status={entry}></StatusEntry>
                        })}
                    </ul>
                </FullPanel>
                <div>
                    <ButtonList buttons={this._buttons()} style={{top:56}}></ButtonList>
                </div>
            </div>
        </Page>);
    },
    componentDidMount: function(x){
        this._queryStatus();
    },
    componentWillUnmount: function(){
        window.clearTimeout(this.interval);
    },
    _buttons: function () {
        var self = this;
        return [
            {
                icon: "arrow-left2",
                onClick: self._onBackClick
            }
        ];
    },
    _onBackClick:function(e){
        Location.goBack();
    },
    _queryStatus: function(){
        if (! this.isMounted()) return;
        var self=this;
        var url="/viewer/avnav_navi.php?request=status";
        $.ajax({
            url: url,
            dataType: 'json',
            cache:	false,
            success: function(data,status){
                if (data && data.handler) {
                    self.setState({list:data.handler});
                }
                self.interval=window.setTimeout(self._queryStatus,5000);
            },
            error: function(status,data,error){
                console.log("status query error");
                Alert("status query error: "+error).then(function() {
                    self.interval = window.setTimeout(self._queryStatus, 5000);
                });
            },
            timeout: 10000
        });

    }

});
