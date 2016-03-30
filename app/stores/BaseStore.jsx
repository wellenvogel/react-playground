/**
 * Created by andreas on 29.03.2016.
 */
"use strict";
import Emitter from "events";
import Dispatcher from "../Dispatcher";
var CHANGE_EVENT = 'avnchange';

class BaseStore extends Emitter{
    //to be overloaded
    actionFunction(action){
        throw new Exception("actionFunction not overloaded");
    }
    constructor() {
        super();
        var self = this;
        this.dispatchToken = Dispatcher.register(function (action) {
            self.actionFunction(action);
        });
    }
    emitChange(){
        this.emit(CHANGE_EVENT);
    }
    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default BaseStore;