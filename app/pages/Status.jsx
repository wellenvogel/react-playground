/**
 * Created by andreas on 09.02.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var FullPanel=require("../components/PanelFull.jsx");
var Location=require("../util/Location.jsx");
var MList=require('react-toolbox/lib/list').List;
var MListItem=require('react-toolbox/lib/list').ListItem;
var MListSubHeader=require('react-toolbox/lib/list').ListSubHeader;
var MListDivider=require('react-toolbox/lib/list').ListDivider;
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
            <MListItem className={style.workerStatus}
                avatar={icon}
                caption={item.name}
                legend={item.info}>
            </MListItem>
        );
    }
});
var StatusEntry=React.createClass({
    render: function(){
        var base=this.props.status.configname;
        var hasSub=this.props.status.info.items.length?true:false;
        return(
            <div>
                <MListSubHeader caption={base}></MListSubHeader>
                { this.props.status.info.items.map(function (entry) {
                    return (<WorkerStatus key={base+entry.name} item={entry}>
                    </WorkerStatus>);
                })
                }
                <MListDivider/>

            </div>
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
        <FullPanel>
            <FullPanel scrollable={true}>
                    <h3>Server Status</h3>
                    <MList >
                        {this.state.list.map(function(entry){
                            return <StatusEntry status={entry}></StatusEntry>
                        })}
                    </MList>
            </FullPanel>
            <ButtonList buttons={this._buttons()}></ButtonList>
        </FullPanel>);
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
