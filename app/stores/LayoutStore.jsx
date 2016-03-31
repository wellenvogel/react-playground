import BaseStore from "./BaseStore.jsx";
import Constants from "../Constants";

class LayoutStore extends BaseStore{
    constructor(){
        super();
        this.widgetList=[{
            name: 'SOG',
        },
        {
            name: 'COG',
        }];
    }
    actionFunction(action){
        if (! action.type != Constants.actions.WIDGET) return;
        var layoutIndex=action.layoutIndex;
        var widgetName=action.widgetName;
        //TODO: add /remove...
        if (layoutIndex < 0 || layoutIndex >= this.widgetList.length) return;
        this.widgetList[layoutIndex].name=widgetName;
        this.emitChange();
    }
    getWidgetList(){
        return this.widgetList;
    }

};

module.exports=new LayoutStore();