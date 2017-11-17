/**
 * Created by andreas on 28.01.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");
var Alert=require("../components/Alert.jsx").alert;
var FullPanel=require('../components/PanelFull.jsx');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');
var Page=require("../components/Page.jsx");
var ToolBar=require("../components/ToolBar.jsx");

var csstyle=require('./Main.scss');


var ListItem = React.createClass({
    render: function () {
        var imageUrl = require("../css/images/Chart60.png");
        if (this.props.data.icon) {
            imageUrl = this.props.icon
        }
        return (
            <div className={csstyle.chartListItem + " section"}
                onClick={this._onChartSelected} ripple>
                    <img src={imageUrl} className={csstyle.chartListImage}></img>
                    <span className={csstyle.chartListItems+" item-text"}>
                    {this.props.data.name}
                    </span>
                    <span className="float-right">
                        <i className="icon-chevron-right"></i>
                    </span>
            </div>
        );
    },
    _onChartSelected: function () {
        console.log("selected chart " + this.props.data.name);
        Location.pushPage("map", {mapdata: this.props.data});
    }
});

var ChartList=React.createClass({
    render: function(){
        var items=this.props.items;
        return(
            <FullPanel scrollable={true} className="section">
                <ul className="list">
                    {items.map(function (result) {
                        return <ListItem data={result} key={result.name}></ListItem>
                    })}
                </ul>
            </FullPanel>
        )
    }
});



module.exports=React.createClass({
    interval:0,
    render: function(){
        var status={
            ais:{
                status: "Green",
                text: "25 targets"
            },
            nmea:{
                status:"Yellow",
                text: "7/3"
            }
        };
        var content=<h1>Loading charts...</h1>;
        if (this.state.list && this.state.list.length){
            content=<ChartList items={this.state.list}></ChartList>;
        }
        return (
            <Page>
                <ToolBar label="AvNav">
                    <span className="float-right">
		                <button className="icon-button"><i className={this.state.gpsOk?"icon-gps-fixed":"icon-gps-not-fixed"}></i></button>
	                </span>
                </ToolBar>
                <FullPanel scrollable top buttons>
                    {content}
                </FullPanel>
                <ButtonList top buttons={this.buttons()}></ButtonList>
            </Page>
        );
    },
    buttons:function(){
        var self = this;
        return [
            {
                icon: "stats-bars2",
                onClick: self._onStatsClick
            },
            {
                //muiIcon: "settings",
                icon: "cog",
                onClick: self._onSettingsClick
            },
            {
                //muiIcon: "settings",
                icon: "x",
                onClick: self._onTestClick
            }
        ];
    },
    getInitialState: function(){
        var list=[];
        return {
            list:list,
            gpsOk: false
        }
    },
    change: function(o) {
        console.log("Mainpage change called");
    },
    timer:function(){
      this.setState({
          gpsOk:!this.state.gpsOk
      });
    },
    componentDidMount: function(x){
        Store.addChangeListener(this.change);
        this.interval=window.setInterval(this.timer,1000);
        this._fillData();
    },
    componentWillUnmount: function(){
        Store.removeChangeListener(this.change);
        window.clearInterval(this.interval);
    },
    _onStatsClick: function(e){
        console.log("clicked "+e.target);
        Location.pushPage("status");
    },
    _onTestClick: function(e){
        console.log("clicked "+e.target);
        Location.pushPage("test");
    },
    _onSettingsClick: function(e){
        console.log("clicked "+e.target);
        Alert(<p>This feature is not implemented yet</p>);
    },
    _fillData: function(){
        var url="/viewer/avnav_navi.php?request=listCharts";
        var self=this;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            error: function(ev){
                self.setState(self.getInitialState());
                Alert("unable to read chart list: "+ev.responseText);
            },
            success: function(data){
                if (data.status != 'OK'){
                    Alert("reading chartlist failed: "+data.info);
                    return;
                }
                self.setState({list:data.data});

            }

        });
    }


});



