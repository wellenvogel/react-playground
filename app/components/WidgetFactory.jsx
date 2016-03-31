import Widget from "./Widget.jsx";
import Formatter from "../util/Formatter.jsx";
import React from "react";
import Constants from "../Constants";
import assign from "object-assign";

var widgetList=[
    {
        key: Constants.values.SPEED,
        max: "100.0",
        unit: "kn",
        caption: 'SOG',
        formatter: function(val){ return Formatter.formatDecimal(val,4,1);},
        wclass: Widget
    },
    {
        key: Constants.values.COURSE,
        max: "999",
        unit: "°",
        caption: 'COG',
        formatter: function(val){ return Formatter.formatDecimal(val,3,0);},
        wclass: Widget
    },
];

class WidgetFactory{
    /**
     * find a complete widget description
     * @param widget - either a name or a widget description with a name field
     * @returns {*}
     */
    findWidget(widget){
        var i=this.findWidgetIndex(widget);
        if (i < 0) return undefined;
        return widgetList[i];
    }

    /**
     * find teh index for a widget
     * @param widget - either a name or a widget description with a name field
     * @returns {number} - -1 omn error
     */
    findWidgetIndex(widget){
        if (widget === undefined) return -1;
        var search=widget;
        if (typeof(widget) !== "string"){
            search=widget.name;
        }
        var i;
        for (i=0;i<widgetList.length;i++) {
            var e = widgetList[i];
            if ((e.name !== undefined && e.name == search ) || (e.caption == search)) {
                return i;
            }
        }
        return -1;
    }
    getWidgetWidth(name: String){
        var e=this.findWidget(name);
        if (! e) return 0;
        return e.max.length * 1.5;
    }
    createWidget(name: String, style: Object,click: Function){
        var e=this.findWidget(name);
        if (e) {
            return React.createElement(e.wclass, {
                wkey: e.key,
                wunit: e.unit,
                wcaption: e.caption,
                wformatter: e.formatter,
                wclick: function(){
                    click();
                },
                style: style
            });
        }
        return React.createElement("div",{},"widget "+name+" not found");
    }
    getWidget(index: Number){
        if (index < 0 || index >= widgetList.length) return undefined;
        var el=assign({},widgetList[index]);
        if (el.name === undefined) el.name=el.caption;
        if (el.description === undefined)el.description=el.name;
        return el;
    }
    getAvailableWidgets(){
        var rt=[];
        var i;
        for (i=0;i< widgetList.length;i++){
            var el=this.getWidget(i);
            rt.push(el);
        }
        return rt;
    }
}

module.exports=new WidgetFactory();