
jest.dontMock('../MyComponent.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MyComponent = require('../MyComponent.jsx');
console.log("Test starts: ");
describe('MyComponent', () => {

    it('renders at all', () => {

        // Render a checkbox with label in the document
        var mycomp = TestUtils.renderIntoDocument(
            <MyComponent prefix="TEST"/>
        );
        var mdom=ReactDOM.findDOMNode(mycomp);
        console.log("myComp:"+mdom+", text="+mdom.textContent);
        expect(mdom.textContent).toEqual("TEST:Initial");
    }),
    it('renders changed state', () => {

        // Render a checkbox with label in the document
        var mycomp = TestUtils.renderIntoDocument(
            <MyComponent prefix="TEST"/>
        );
        mycomp.change({text: "Changed"});
        var mdom=ReactDOM.findDOMNode(mycomp);
        console.log("myComp:"+mdom+", text="+mdom.textContent);
        expect(mdom.textContent).toEqual("TEST:Changed");
    })
});