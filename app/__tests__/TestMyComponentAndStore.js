
jest.dontMock('../MyComponent.jsx');
jest.dontMock('../Store.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MyComponent = require('../MyComponent.jsx');
const Store = require('../Store.jsx');
console.log("Test starts: ");
describe('MyComponent and Store', () => {

    it('renders initial values and register', () => {
        var mycomp = TestUtils.renderIntoDocument(
            <MyComponent prefix="TEST"/>
        );
        var mdom=ReactDOM.findDOMNode(mycomp);
        console.log("myComp:"+mdom+", text="+mdom.textContent);
        expect(mdom.textContent).toEqual("TEST:Initial");
        expect(Store.has(mycomp)).toEqual(true);
    }),

    it('renders changed state', () => {
        var mycomp = TestUtils.renderIntoDocument(
            <MyComponent prefix="TEST"/>
        );
        Store.update({text: "Changed"});
        var mdom=ReactDOM.findDOMNode(mycomp);
        console.log("myComp:"+mdom+", text="+mdom.textContent);
        expect(mdom.textContent).toEqual("TEST:Changed");
    })
});