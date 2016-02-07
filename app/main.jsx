import React from 'react';
import MyComponent from './MyComponent.jsx';
import Store from "./stores/Store.jsx";
import App from "./App.jsx";



React.render(
    <App/>,
    document.getElementById('mount-point')
);

console.log("ReactMain");
setInterval(function(){
    //console.log("timer");
    Store.update({text:new Date().toISOString()});
},1000);