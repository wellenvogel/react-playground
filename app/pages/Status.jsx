/**
 * Created by andreas on 09.02.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");
var MList=require('material-ui/lib/lists/list');
var MListItem=require('material-ui/lib/lists/list-item');
var Alert=require("../components/Alert.jsx").alert;


var statusIcons= {
    INACTIVE: require("../css/images/GreyBubble40.png"),
    STARTED: require("../css/images/YellowBubble40.png"),
    RUNNING: require("../css/images/YellowBubble40.png"),
    NMEA:   require("../css/images/GreenBubble40.png"),
    ERROR: require("../css/images/RedBubble40.png")
};

var WorkerStatus=React.createClass({
    style:{
      marginLeft:7
    },
    render: function(){
        var item=this.props.item;
        var icon=statusIcons[item.status||"INACTIVE"]||statusIcons.INACTIVE;
        return(
            <div style={this.style}>
                <img className="avn_status_image_small" src={icon}></img>
                <span className="avn_status_name">{item.name}</span>
                <span className="avn_status_info">{item.info}</span>
            </div>
        );
    }
});
var StatusEntry=React.createClass({
    render: function(){
        var base=this.props.status.configname;
        return(
            <MListItem >
                {base}<br></br>
                {this.props.status.info.items.map(function(entry){
                    return (<WorkerStatus key={base+entry.name} item={entry}>
                    </WorkerStatus>);
                })}
            </MListItem>
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
        <div className="avn_page">
            <div className='avn_left_panel'>
                <div className="avn_scrollable">
                    <h1>Server Status</h1>
                    <MList >
                        {this.state.list.map(function(entry){
                            return <StatusEntry status={entry}></StatusEntry>
                        })}
                    </MList>
                </div>
            </div>
            <ButtonList buttons={this._buttons()}></ButtonList>
        </div>);
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
