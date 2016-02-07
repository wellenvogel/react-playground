/**
 * Created by andreas on 28.01.16.
 */
var Store=require('../stores/Store.jsx');
var React=require('react');

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
module.exports=React.createClass({
    render: function(){
        return (
            <div className="content">
                <ChartList items={this.state.list}></ChartList>
            </div>
        );
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
    }

});



