/**
 * Created by andreas on 28.01.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');
var Button=require('../components/Button.jsx');

var ListItem=React.createClass({
   render: function(){
       return (
           <li className="table-view-cell">{this.props.cname}</li>
       );
   }
});

var ChartList=React.createClass({
    render: function(){
        var items=this.props.items;
        return(
           <ul className="table-view">
               {items.map(function(result){
                   return <ListItem cname={result.name} key={result.name}></ListItem>
               })}
           </ul>
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

var ButtonList=React.createClass({
   render: function(){
       var buttons=this.props.buttons;
       return(
       <div className='avn_right_panel'>
           {buttons.map(function(entry) {
                   return <Button {...entry}></Button>;
               }
           )}

       </div>
       );

   }
});
module.exports=React.createClass({
    render: function(){
        return (
            <div className="avn_page">
                <div className="avn_left_panel">
                    <ChartList items={this.state.list}></ChartList>
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
                onClick: self.onClick
            }
        ];
    },
    getInitialState: function(){
        return {
            list:[
                {name: "Chart1"},
                {name: "Chart2"}
            ]
        }
    },
    change: function(o) {
        console.log("change called");
    },
    componentDidMount: function(x){
        Store.register(this);
    },
    onClick: function(e){
        console.log("clicked "+e.target);
    }

});



