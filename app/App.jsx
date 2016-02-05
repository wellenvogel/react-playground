import React from 'react';
import MyComponent from './MyComponent.jsx';

module.exports=React.createClass({
    render:function(){
        return <div>
            <MyComponent prefix="1"/>
            <p>Some Static Text</p>
            <MyComponent prefix="2"/>
            <p>Some More Static Text</p>
            <MyComponent prefix="3"/>
            <MyComponent prefix="4"/>
            <MyComponent prefix="5"/>
            <MyComponent prefix="6"/>
            <MyComponent prefix="7"/>
        </div>;
    }
});