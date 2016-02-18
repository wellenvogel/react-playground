import React from 'react';
import MainPage from "./pages/Main.jsx";
import StatusPage from "./pages/Status.jsx";
import MapPage from "./pages/Map.jsx";
import Location from "./util/Location.jsx";
import extend from "lodash/extend";
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';



module.exports=React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getInitialState: function getInitialState() {
        var rt={
            muiTheme: getMuiTheme()
        };
        return rt;
    },
    getChildContext: function getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },
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
        var style={
            fontFamily: this.state.muiTheme.baseTheme.fontFamily,
            backgroundColor: this.state.muiTheme.baseTheme.palette.canvasColor,
            color: this.state.muiTheme.baseTheme.palette.textColor
        };
        return (
            <div style={style}>
                {page}
            </div>
        );
    },
    _mainPage: function(){
        Location.setPage("main");
    }
});