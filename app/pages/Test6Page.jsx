/**
 * Created by andreas on 28.04.16.
 */
import React from 'react';
import PageBase from './PageBase.jsx';
import Page from '../components/Page.jsx';
import ButtonList from '../components/ButtonList.jsx';

class Test6Page extends PageBase{
    render(){
        return (
        <Page>
            <h1>Test Page</h1>
            <ButtonList buttons={this.getButtons()} top></ButtonList>
        </Page>
        );
    }
    componentDidMount(){
        super.componentDidMount();
        console.log("TestPage didMount called");
    }
}

export default Test6Page;

