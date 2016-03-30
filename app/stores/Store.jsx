/**
 * a store (similar to the flux model)
 * @type {{list: Array, register: Function, update: Function}}
 */
import BaseStore from "./BaseStore.jsx";

class Store extends BaseStore{
    actionFunction(action){
        console.log("store action called with "+action.type);
        this.emitChange();
    }
}

module.exports=new Store();
