/**
 * Created by andreas on 29.03.2016.
 */
var Constants=require("../Constants");
var Dispatcher=require("../Dispatcher");

var NavAction={
    fire: function(data){
        Dispatcher.dispatch({type: Constants.actions.NAV,navData: data});
    }
};
module.exports=NavAction;
