/**
 * Created by andreas on 28.01.16.
 */
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");
var Alert=require("../components/Alert.jsx").alert;
var MapHolder=require("../nav/Map.js");
var FullPanel=require("../components/PanelFull.jsx");
var Page=require("../components/Page.jsx");
var Widget=require("../components/Widget.jsx");
var css=require("./Map.scss");
var Formatter=require("../util/Formatter.jsx");
var Constants=require("../Constants");
var Factory=require("../components/WidgetFactory.jsx");

MapHolder.init();

var Map=React.createClass({
    render: function(){
        var style={
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        return(
            <div ref="mapdiv" style={style}>
            </div>
        );
    },
    componentDidMount:function(){
        MapHolder.renderTo(this.refs.mapdiv);
    },
    componentWillUnmount: function(){
        MapHolder.renderTo(null);
    }

});

const widgetMargin=1; //em

module.exports=React.createClass({
    widgets:[
        {
            name: 'SOG',
        },
        {
            name: 'COG',
        },
        {
            name: "unknown"
        }

    ]
    ,
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

        var start=1;
        var bottom="10px";
        var istyle={
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100

        };
        return (
            <Page>
                <FullPanel>
                    <input type="text" style={istyle} className="scale" onChange={this.onChange}></input>
                    <Map></Map>
                </FullPanel>
                <ButtonList buttons={this._buttons()} float></ButtonList>
                <div className={css.widgetContainerLeft}>
                    {
                        this.widgets.map(function (entry) {
                            var width = Factory.getWidgetWidth(entry.name) + widgetMargin * 1.5;
                            var style = {
                                bottom: bottom,
                                left: start + "em",
                                //position: "absolute",
                                width: width + "em",
                                float: 'right'

                            };
                            start += width * 1.1;
                            return Factory.createWidget(entry.name,style);
                        })
                    }
                </div>
            </Page>
        );
    },
    onChange: function(input){
        var v=input.target.value;
        if (v == "") return;
        v=parseFloat(v)
        if (v < 0.0001) return;
        MapHolder.changeScale(v);
        if (v >= 1) v=(v-1)*0.5+1;
        else v=1-(1-v)*0.5;
        $('body').css('zoom',v);
    },
    _buttons: function () {
        var self = this;
        return [
            {
                icon: "zoom-in",
                onClick: self._onZoomInClick
            },
            {
                icon: "zoom-out",
                onClick: self._onZoomOutClick
            },
            {
                icon: "arrow-left2",
                onClick: self._onBackClick
            }
        ];
    },
    _onBackClick:function(e){
        Location.goBack();
    },
    _onZoomInClick:function(e){
        MapHolder.zoom(1);
    },
    _onZoomOutClick:function(e){
        MapHolder.zoom(-1);
    }
    ,
    getInitialState: function(){
        return({});
    }



});



