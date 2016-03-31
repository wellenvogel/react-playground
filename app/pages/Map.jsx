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
                    <input type="text" style={istyle} className="scale" onChange={this._onScaleChange}></input>
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
                            var ref="Widget"+widgetLayoutIndex;
                            layoutIndex++;
                            return Factory.createWidget(entry.name,style,function(){
                               self._onWidgetClick(widgetLayoutIndex) ;
                            },ref);
                        })
                    }
                </div>
                {(this.state.editingWidget >= 0)?<PopUp {...this._getPopUpProperties()}></PopUp>:""}
            </Page>
        );
    },
    _getPopUpProperties:function(){
        var rt={};
        if (this.state.editingWidget < 0){
            rt.visible=false;
            return;
        }
        var self=this;
        var layoutIndex=this.state.editingWidget;
        rt.visible=true;
        rt.headline="Select Value";
        var optionList=Factory.getAvailableWidgets();
        optionList.unshift({caption:"-none-"});
        rt.options=optionList;
        rt.selected=Factory.findWidgetIndex(Layout.getWidgetAt(this.state.editingWidget))+1;
        rt.selectCallback=function(index){
            self._onPopUpSelect(layoutIndex,index);
        };
        rt.parent=this.refs["Widget"+layoutIndex];
        return rt;
    },
    /**
     * click handler for widget
     * @param layoutIndex
     */
    _onWidgetClick: function(layoutIndex){
        this.setState({editingWidget: layoutIndex});
    },
    _onPopUpSelect: function(layoutIndex, index){
        this.setState({editingWidget:-1});
        if (index <= 0){
            //TODO. handle index 0 (none)
            return;
        }
        var widget=Factory.getWidget(index-1);
        if (widget === undefined) return;
        WidgetAction.fire(layoutIndex,widget.name);


    },
    _onLayoutChange: function(){
        this.setState({
            layout: Layout.getWidgetList()
        });
    },
    _onScaleChange: function(input){
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
            editingWidget: -1
        });
    },
    componentDidMount:function(){
        Layout.addChangeListener(this._onLayoutChange);
    },
    componentWillUnmount: function(){
        Layout.removeChangeListener(this._onLayoutChange);
    }



});



