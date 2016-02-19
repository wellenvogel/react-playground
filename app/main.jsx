/**
 * test app main
 * see also https://github.com/kriasoft/react-starter-kit/blob/master/src/client.js
 */


import React from 'react';
import Store from "./stores/Store.jsx";
import App from "./App.jsx";
import Location from "./util/Location.jsx";
import assign from 'object-assign';
import AlertHandler from './components/Alert.jsx';
import TApp from 'react-toolbox/lib/app/App';
import 'babel-polyfill';
import './css/avnav_viewer.less';

import injectTapEventPlugin from 'react-tap-event-plugin';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

//getcommon.scss without module stuff
require('react-toolbox/lib/commons.scss');
require('./css/commons.scss');


function render(state) {
    var toRender=
        <TApp >
            <div style={{position: "fixed",top: 0,bottom:0,left:0,right:0}}>
                <App state={state}></App>
            </div>
        </TApp>;
    React.render(
        toRender,
        document.getElementById('mount-point')
    );
}
var unlisten=Location.listen(location => {
    var currentLocation = location;
    var currentState = assign({}, location.state, {
        path: location.pathname,
        query: location.query,
        state: location.state
    });
    if (! currentState.state) currentState.state={}
    if (! currentState.state.page) currentState.state.page="main";
    render(currentState.state);
});


console.log("ReactMain started");
window.addEventListener('pagehide', () => {
    unlisten();
});
setInterval(function(){
    //console.log("timer");
    Store.update({text:new Date().toISOString()});
},1000);
AlertHandler.render(document.getElementById('overlay-container'));