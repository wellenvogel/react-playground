/**
 * Created by andreas on 29.03.2016.
 */
var Constants=require("../Constants");
var Dispatcher=require("../Dispatcher");

var WidgetAction={
    fire: function(layoutIndex,widgetName){
        Dispatcher.dispatch({type: Constants.actions.WIDGET,layoutIndex: layoutIndex,widgetName: widgetName});
    }
};
module.exports=WidgetAction;
