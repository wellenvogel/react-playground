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
        return (
            <Page>
                <FullPanel>
                    <Map></Map>
                </FullPanel>
                <ButtonList buttons={this._buttons()} float></ButtonList>
            </Page>
        );
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



