
jest.dontMock('../Store.jsx');


const Store = require('../stores/Store.jsx');
console.log("Test starts: ");
var testObject={
    data: new Object(),
    changeCount: 0,
    change: function(object){
        this.data=object;
        this.changeCount++;
    }
};
describe('Store', () => {

    it('registers a callback', () => {
        Store.register(testObject);
        expect(Store.has(testObject)).toEqual(true);
    }),
    it('calls back on change', () => {
        Store.update({name:"testvalue"});
        expect(testObject.changeCount).toEqual(1);
        expect(testObject.data).toEqual({name:"testvalue"});
    })
});