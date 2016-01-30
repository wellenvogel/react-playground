import React from 'react';
import MyComponent from './MyComponent.jsx';
import Store from "./Store.jsx"

React.render(
    <div>
        <MyComponent prefix="1"/>
        <p>Some Static Text</p>
        <MyComponent prefix="2"/>
        <p>Some More Static Text</p>
        <MyComponent prefix="3"/>
        <MyComponent prefix="4"/>
        <MyComponent prefix="5"/>
        <MyComponent prefix="6"/>
        <MyComponent prefix="7"/>
    </div>,
    document.getElementById('mount-point')
);

console.log("ReactMain");
setInterval(function(){
    console.log("timer");
    Store.update({text:new Date().toISOString()});
},1000);