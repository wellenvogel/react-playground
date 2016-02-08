import React from 'react';
require("./css/avnav_viewer.less");
import MainPage from "./pages/Main.jsx";


module.exports=React.createClass({
    render:function(){
        return (
            <MainPage></MainPage>
        );
    }
});