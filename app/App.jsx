import React from 'react';
require("./css/avnav_viewer.less");
import MainPage from "./pages/Main.jsx";
import StatusPage from "./pages/Status.jsx";
import MapPage from "./pages/Map.jsx";
import Location from "./util/Location.jsx";


module.exports=React.createClass({
    render:function(){
        var pagename=this.props.state.page;
        var page=
            <div>
                <h1>Unknown page:{pagename}</h1>
                <button onClick={this._mainPage}>Start</button>
            </div>
            ;
        if (pagename == "main") page=<MainPage options={this.props.state.options}></MainPage>;
        if (pagename == "status") page=<StatusPage options={this.props.state.options}></StatusPage>;
        if (pagename == "map") page=<MapPage options={this.props.state.options}></MapPage>;
        return (
            page
        );
    },
    _mainPage: function(){
        Location.setPage("main");
    }
});