/**
 * test app main
 * see also https://github.com/kriasoft/react-starter-kit/blob/master/src/client.js
 */


import React from 'react';
import Store from "./stores/Store.jsx";
import App from "./App.jsx";
import Location from "./util/Location.jsx";

require("./css/avnav_viewer.less");

function render(state) {
    React.render(
        <App state={state}/>,
        document.getElementById('mount-point')
    );
}
var unlisten=Location.listen(location => {
    var currentLocation = location;
    var currentState = Object.assign({}, location.state, {
        path: location.pathname,
        query: location.query,
        state: location.state
    });
    if (! currentState.state) currentState.state={}
    if (! currentState.state.page) currentState.state.page="main";
    render(currentState.state);
});


console.log("ReactMain started");
addEventListener(window, 'pagehide', () => {
    unlisten();
});
setInterval(function(){
    //console.log("timer");
    Store.update({text:new Date().toISOString()});
},1000);