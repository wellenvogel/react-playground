/**
 * Created by andreas on 28.01.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");
var MList=require('material-ui/lib/lists/list');
var MListItem=require('../components/MListItem.jsx');
var Alert=require("../components/Alert.jsx").alert;
var getMuiTheme = require('material-ui/lib/styles/getMuiTheme');
var FullPanel=require('../components/PanelFull.jsx');
var extend = require('lodash/extend');
var Settings=require('../stores/Settings.jsx');

var ListItem = React.createClass({
    contextTypes: {
        muiTheme: React.PropTypes.object
    },
    getInitialState: function () {
        return({
            muiTheme: this.context.muiTheme||getMuiTheme.default
        });
    },
    render: function () {
        var style={
            borderBottom: '1px solid '+this.state.muiTheme.tableRow.borderColor
        };
        var imageUrl = require("../css/images/Chart60.png");
        if (this.props.data.icon) {
            imageUrl = this.props.icon
        }
        return (
            <MListItem style={style} onClick={this._onChartSelected}
                       leftIcon={<img  src={imageUrl}></img>}
                       primaryText={this.props.data.name}>
            </MListItem>
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
            <FullPanel scrollable={true}>
                <MList >
                    {items.map(function (result) {
                        return <ListItem data={result} key={result.name}></ListItem>
                    })}
                </MList>
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

//factors to derive from basic fontsize
const statusFontFactor=1.0/1.5;
const statusLineHeightFactor=1.0/1.3;
const widgetTopBottomMargin=2;
const widgetTopBottomPadding=2;
var statusWidgetStyle={
    backgroundColor: '#C7C7AE', //TODO: color overwrite from theme
    paddingRight: 8,
    paddingBottom: widgetTopBottomPadding,
    paddingTop: widgetTopBottomPadding,
    marginBottom: widgetTopBottomMargin,
    marginTop: widgetTopBottomMargin,
    marginLeft: 2,
    borderRadius: 3,
};
var Status=React.createClass({
    render: function(){
        var fb=Settings.getFontBase();
        var finalStyle=extend({},this.props.style,statusWidgetStyle,{
            fontSize:  fb*statusFontFactor,
            //lineHeight: fb*statusLineHeightFactor
        });
        var imageStyle={
            height: fb*statusFontFactor*2,
            width:  fb*statusFontFactor*2,
            verticalAlign: 'middle'
        };
        return(
            <div style={finalStyle}>
                <img style={imageStyle} src={this.getStatusImage()}/>
                {this.props.name}&nbsp;<span >{this.props.status.text}</span>
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
       var style=extend({},this.props.style,{
           backgroundColor:'#dee2cf'
       });
       return (
           <FullPanel style={style} noTop={true}>
                   <div style={{float:'left'}}>
                       <Status status={this.props.status.ais} name="Ais"></Status>
                       <Status status={this.props.status.nmea} name="Nmea"></Status>
                   </div>
                   <div style={{float:'right'}}>
                       <a href="http://www.wellenvogel.de">AvNav React0.1</a>
                   </div>
           </FullPanel>
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
        var bottomHeight=2*(Settings.getFontBase()*statusFontFactor*2+widgetTopBottomMargin*2+widgetTopBottomPadding*2); //image height + paddings, margings
        return (
            <FullPanel>
                    <FullPanel style={{bottom:bottomHeight}}>
                        {content}
                    </FullPanel>
                    <BottomPanel status={status} style={{height:bottomHeight}}></BottomPanel>
                <ButtonList buttons={this.buttons()}></ButtonList>
            </FullPanel>
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



