import BaseStore from "./BaseStore.jsx";
import Constants from "../Constants";

class NavStore extends BaseStore{
    constructor(){
        super();
        this.navData={};
    }
    actionFunction(action){
        if (action.type != Constants.actions.NAV) return;
        this.navData=action.navData;
        this.emitChange();
    }
    getNavData(){
        return this.navData;
    }
    getValue(id: Number){
        const nc=Constants.values;
        if (id == nc.COURSE){
            return this.navData.track||0;
        }
        if (id == nc.SPEED){
            return this.navData.speed||0;
        }
        return "???";
    }
};

module.exports=new NavStore();