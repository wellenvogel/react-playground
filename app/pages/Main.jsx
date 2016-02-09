/**
 * Created by andreas on 28.01.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var ButtonList=require("../components/ButtonList.jsx");
var Location=require("../util/Location.jsx");

var ListItem=React.createClass({
   render: function(){
       var imageUrl="images/Chart60.png";
       if (this.props.data.icon){
           imageUrl=this.props.icon
       }
       return (
           <li className="table-view-cell media navigate-right" onClick={this._onChartSelected}>
               <img className="media-object pull-left avn_mainpage_image" src={imageUrl}></img>
               <div className="media-body">
                   {this.props.data.name}
               </div>
           </li>
       );
   },
    _onChartSelected: function(){
        console.log("selected chart "+this.props.data.name);
    }
});

var ChartList=React.createClass({
    render: function(){
        var items=this.props.items;
        return(
            <div className="content">
                <ul className="table-view">
                    {items.map(function (result) {
                        return <ListItem data={result} key={result.name}></ListItem>
                    })}
                </ul>
            </div>
        )
    }
});

/*
<button id="avb_ShowStatus" type="button" className="avn_button"></button>
<button id="avb_ShowSettings" type="button" className="avn_button"></button>
<button id="avb_ShowHelp" type="button" className="avn_button"></button>
<button id="avb_ShowDownload" type="button" className="avn_button"></button>
<button id="avb_Connected" type="button" className="avn_button avn_toggleButton"></button>
<button id="avb_ShowGps" type="button" className="avn_button">000</button>
<button id="avb_Night" type="button" className="avn_button avn_toggleButton"></button>
<button id="avb_MainCancel" type="button" className="avn_button avn_android avn_hidden"></button>
*/


var Status=React.createClass({
    render: function(){
        return(
            <div className='avn_status_widget'>
                <img className='avn_status_image_small' src={'images/'+this.props.status.status+'Bubble40.png'}/>
                {this.props.name}&nbsp;<span className="">{this.props.status.text}</span>
            </div>

        );
    }
});

var BottomPanel=React.createClass({
   render: function(){
       return (
           <div className="avn_left_bottom">
               <div className="pull-left">
                   <Status status={this.props.status.ais} name="Ais"></Status>
                   <Status status={this.props.status.nmea} name="Nmea"></Status>
               </div>
               <div className="pull-right">
                   <a href="http://www.wellenvogel.de">AvNav React0.1</a>
               </div>
           </div>
       );
   }
});
module.exports=React.createClass({
    render: function(){
        var status={
            ais:{
                status: "Green",
                text: "25 targets"
            },
            nmea:{
                status:"Yellow",
                text: "7/3"
            }
        };
        return (
            <div className="avn_page">
                <div className="avn_left_panel">
                    <div className="avn_main">
                        <ChartList items={this.state.list}></ChartList>
                    </div>
                    <BottomPanel status={status}></BottomPanel>
                </div>
                <ButtonList buttons={this.buttons()}></ButtonList>
            </div>
        );
    },
    buttons:function(){
        var self = this;
        return [
            {
                icon: "stats-bars2",
                onClick: self._onStatsClick
            },
            {
                icon: "cog",
                onClick: self._onSettingsClick
            }
        ];
    },
    getInitialState: function(){
        var list=[];
        var i=0;
        for (;i< 20;i++){
            list.push({name:"Chart"+i});
        }
        return {
            list:list
        }
    },
    change: function(o) {
        console.log("change called");
    },
    componentDidMount: function(x){
        Store.register(this);
        this._fillData();
    },
    _onStatsClick: function(e){
        console.log("clicked "+e.target);
        Location.pushPage("status");
    },
    _onSettingsClick: function(e){
        console.log("clicked "+e.target);
    },
    _fillData: function(){
        var url="/viewer/avnav_navi.php?request=listCharts";
        var self=this;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            error: function(ev){
                alert("unable to read chart list: "+ev.responseText);
            },
            success: function(data){
                if (data.status != 'OK'){
                    alert("reading chartlist failed: "+data.info);
                    return;
                }
                self.setState({list:data.data});

            }

        });
    }


});



