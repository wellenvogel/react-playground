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

var style=require('./Main.scss');


var ListItem = React.createClass({
    render: function () {
        var imageUrl = require("../css/images/Chart60.png");
        if (this.props.data.icon) {
            imageUrl = this.props.icon
        }
        return (
            <li className={style.chartListItem + " section"}
                onClick={this._onChartSelected} ripple>
                    <div className={style.chartListInner }>
                    <img className={style.chartListItems+" item-icon"} src={imageUrl}></img>
                    <span className={style.chartListItems+" item-text"}>
                    {this.props.data.name}
                    </span>
                    </div>
            </li>
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


var statusIcons= {
    grey: require("../css/images/GreyBubble40.png"),
    yellow: require("../css/images/YellowBubble40.png"),
    green:   require("../css/images/GreenBubble40.png"),
    red: require("../css/images/RedBubble40.png")
};
var Status=React.createClass({
    render: function(){
        return(
            <div className='avn_status_widget'>
                <img className='avn_status_image_small' src={this.getStatusImage()}/>
                {this.props.name}&nbsp;<span className="">{this.props.status.text}</span>
            </div>

        );
    },
    getStatusImage:function(){
        var color="grey";
        if (this.props.status && this.props.status.status){
            color=this.props.status.status.toLowerCase();
        }
        return statusIcons[color]||statusIcons.grey;
    }
});

var BottomPanel=React.createClass({
   render: function(){
       return (
           <div >
                   <div className="pull-left">
                       <Status status={this.props.status.ais} name="Ais"></Status>
                       <Status status={this.props.status.nmea} name="Nmea"></Status>
                   </div>
                   <div className="pull-right">
                       <a href="http://www.wellenvogel.de">AvNav React0.1</a>
                   </div>
           </div>
       );
   }
});
module.exports=React.createClass({
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
                <div className="avFlexRow">
                    <div className="avFlexColumn avFlexGrow">
                        <FullPanel scrollable={true}>
                            {content}
                        </FullPanel>
                        <BottomPanel status={status}></BottomPanel>
                    </div>
                    <div>
                        <ButtonList buttons={this.buttons()}></ButtonList>
                    </div>
                </div>
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
            }
        ];
    },
    getInitialState: function(){
        var list=[];
        return {
            list:list
        }
    },
    change: function(o) {
        console.log("change called");
    },
    componentDidMount: function(x){
        Store.register(this);
        this._fillData();
    },
    _onStatsClick: function(e){
        console.log("clicked "+e.target);
        Location.pushPage("status");
    },
    _onSettingsClick: function(e){
        console.log("clicked "+e.target);
        Alert({title:"Not Implemented",
            body: <p>This feature is not implemented yet</p>,
        });
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



