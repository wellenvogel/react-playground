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
var Layout=require("../stores/LayoutStore.jsx");
var PopUp=require("../components/PopUpList.jsx");
var WidgetAction=require("../actions/WidgetAction");

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
        var self=this;
        var layoutIndex=0;
        return (
            <Page>
                <FullPanel>
                    <input type="text" style={istyle} className="scale" onChange={this.onChange}></input>
                    <Map></Map>
                </FullPanel>
                <ButtonList buttons={this._buttons()} float></ButtonList>
                <div className={css.widgetContainerLeft}>
                    {
                        this.state.layout.map(function (entry) {
                            var width = Factory.getWidgetWidth(entry.name) + widgetMargin * 1.5;
                            var style = {
                                bottom: bottom,
                                left: start + "em",
                                //position: "absolute",
                                width: width + "em",
                                float: 'right'

                            };
                            start += width * 1.1;
                            var widget=entry;
                            var widgetLayoutIndex=layoutIndex;
                            layoutIndex++;
                            return Factory.createWidget(entry.name,style,function(){
                               self.widgetClick(widget,widgetLayoutIndex) ;
                            });
                        })
                    }
                </div>
                {this.state.popUp.visible?<PopUp {...this.state.popUp}></PopUp>:""}
            </Page>
        );
    },
    widgetClick: function(widget,layoutIndex){
        var self=this;
        var widgetLayoutIndex=layoutIndex;
         this.setState({
             popUp:{
                 visible: true,
                 options: Factory.getAvailableWidgets(),
                 selected: Factory.findWidgetIndex(widget.name),
                 selectCallback: function(index){
                     self.widgetContentChange(widgetLayoutIndex,index);
                     
                 }
             }
         });   
    },
    widgetContentChange: function(layoutIndex,index){
        var name=this.state.popUp.options[index].caption;
        //alert("widget "+name+" for "+layoutIndex+" selected");
        this.setState({popUp:{visible:false}});
        WidgetAction.fire(layoutIndex,name);


    },
    onLayoutChange: function(){
        this.setState({
            layout: Layout.getWidgetList()
        });
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
        return( {
            layout: Layout.getWidgetList(),
            popUp: { visible: false}
        });
    },
    componentDidMount:function(){
        Layout.addChangeListener(this.onLayoutChange);
    },
    componentWillUnmount: function(){
        Layout.removeChangeListener(this.onLayoutChange);
    }



});



