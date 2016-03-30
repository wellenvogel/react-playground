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
        return;
        //this.emitChange();
    }
    getWidgetList(){
        return this.widgetList;
    }

};

module.exports=new LayoutStore();