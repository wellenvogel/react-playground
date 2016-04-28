import React from 'react';
import MainPage from "./pages/Main.jsx";
import StatusPage from "./pages/Status.jsx";
import MapPage from "./pages/Map.jsx";
import Location from "./util/Location.jsx";
import extend from "lodash/extend";
import TestPage from './pages/Test6Page.jsx';
const Settings=require("./stores/Settings.jsx");




module.exports=React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    render:function(){
        var pagename=this.props.state.page;
        var style={
            fontSize:Settings.getFontBase()
        };
        var page=
            <div>
                <h1>Unknown page:{pagename}</h1>
                <button onClick={this._mainPage}>Start</button>
            </div>
            ;
        if (pagename == "main") page=<MainPage options={this.props.state.options} style={style}></MainPage>;
        if (pagename == "status") page=<StatusPage options={this.props.state.options} style={style}></StatusPage>;
        if (pagename == "map") page=<MapPage options={this.props.state.options} style={style}></MapPage>;
        if (pagename == "test") page=<TestPage options={this.props.state.options} style={style}></TestPage>;

        return (
                page
        );
    },
    _mainPage: function(){
        Location.setPage("main");
    }
});