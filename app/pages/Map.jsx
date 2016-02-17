/**
 * Created by andreas on 28.01.16.
 */
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");
var Alert=require("../components/Alert.jsx").alert;
var MapHolder=require("../nav/Map.js");

MapHolder.init();

var Map=React.createClass({
    render: function(){
        return(<div className="avn_main" ref="mapdiv">
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

var BottomPanel=React.createClass({
   render: function(){
       return (
           <div className="avn_left_bottom">
                   <div className="pull-left">

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
        return (
            <div className="avn_page">
                <div className="avn_left_panel">
                    <Map></Map>
                    <BottomPanel status={status}></BottomPanel>
                </div>
                <ButtonList buttons={this._buttons()}></ButtonList>
            </div>
        );
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
    }
    ,
    getInitialState: function(){
        return({});
    }



});



