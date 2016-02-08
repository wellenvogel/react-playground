import React from 'react';
import Store from "./stores/Store.jsx";
import App from "./App.jsx";

require("./css/avnav_viewer.less");

React.render(
    <App/>,
    document.getElementById('mount-point')
);

console.log("ReactMain");
setInterval(function(){
    //console.log("timer");
    Store.update({text:new Date().toISOString()});
},1000);