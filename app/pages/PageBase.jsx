/**
 * Created by andreas on 28.04.16.
 */
import React from 'react';
import Location from '../util/Location.jsx';
import assign from 'object-assign';

class PageBase extends React.Component{
    constructor(){
        super();
        this.goBack=this.goBack.bind(this);
        this.getButtons=this.getButtons.bind(this);
    }
    goBack(){
        Location.goBack();
    }
    getButtons(others) {
        var base = [
            {
                icon: "arrow-left2",
                onClick: this.goBack
            }
        ];
        if (others) {
            return [].concat(others,base);
        }
        return base;
    }
    componentDidMount(){
        console.log("page base didMount called");
    }
    componentWillUnmount(){
        console.log("page base willUnmount called");
    }

}

export default PageBase;

