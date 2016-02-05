
jest.dontMock('../App.jsx');

var React=require('react');
var ReactDOM=require('react-dom');
var TestUtils=require('react-addons-test-utils');
var rewire=require('rewire');
console.log("test starts");

var App=require("../App.jsx");
var MyComponent=require("../MyComponent.jsx");
MyComponent.prototype.render=function(){
    return <h4>mockChild</h4>
};


console.log("Test starts: TestApp");
describe('App launches', () => {

    it('renders mock output', () => {

        // Render a checkbox with label in the document
        var myApp = TestUtils.renderIntoDocument(
            <App />
        );
        var mdom=ReactDOM.findDOMNode(myApp);
        console.log("myApp:"+mdom+", text="+mdom.textContent);
        expect(mdom.textContent).toContain("mockChild");

    })
});