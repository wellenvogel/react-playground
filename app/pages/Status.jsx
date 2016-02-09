/**
 * Created by andreas on 09.02.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");

var StatusEntry=React.createClass({
    render: function(){
        var base=this.props.status.configname;
        return(
            <li className="table-view-cell">
                {base}<br></br>
                {this.props.status.info.items.map(function(entry){
                    return (<div key={base+entry.name}>
                        name={entry.name}, status={entry.info}
                    </div>);
                })}
            </li>
        );
    }
});

module.exports=React.createClass({
    getInitialState: function(){
        return{
            list: []
        }  ;
    },
    render: function(){
        return (
        <div className="avn_page">
            <div className='avn_left_panel'>
                <div className="content">
                    <h1>Server Status</h1>
                    <ul className="table-view">
                        {this.state.list.map(function(entry){
                            return <StatusEntry status={entry}></StatusEntry>
                        })}
                    </ul>
                </div>
            </div>
            <ButtonList buttons={this._buttons()}></ButtonList>
        </div>);
    },
    componentDidMount: function(x){
        this._queryStatus();
    },
    _buttons: function () {
        var self = this;
        return [
            {
                icon: "arrow-left2",
                onClick: self._onBackClick
            }
        ];
    },
    _onBackClick:function(e){
        Location.goBack();
    },
    _queryStatus: function(){
        var self=this;
        var url="/viewer/avnav_navi.php?request=status";
        $.ajax({
            url: url,
            dataType: 'json',
            cache:	false,
            success: function(data,status){
                if (data && data.handler) {
                    self.setState({list:data.handler});
                }
            },
            error: function(status,data,error){
                log("status query error");
                alert("status query error");
            },
            timeout: 10
        });

    }

});
