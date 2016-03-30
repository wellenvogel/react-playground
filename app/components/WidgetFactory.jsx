import Widget from "./Widget.jsx";
import Formatter from "../util/Formatter.jsx";
import React from "react";
import Constants from "../Constants";

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
    findWidget(name: String){
        var i;
        for (i=0;i<widgetList.length;i++) {
            var e = widgetList[i];
            if ((e.name !== undefined && e.name == name ) || (e.caption == name)) {
                return e;
            }
        }
        return undefined;
    }
    getWidgetWidth(name: String){
        var e=this.findWidget(name);
        if (! e) return 0;
        return e.max.length * 1.5;
    }
    createWidget(name: String, style: Object){
        var e=this.findWidget(name);
        if (e) {
            return React.createElement(e.wclass, {
                wkey: e.key,
                wunit: e.unit,
                wcaption: e.caption,
                wformatter: e.formatter,
                style: style
            });
        }
        return React.createElement("div",{},"widget "+name+" not found");
    }
}

module.exports=new WidgetFactory();