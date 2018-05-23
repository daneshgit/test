const { assert } = require('chai');
const { sayhello, addnumbers } = require('../testing.js');

describe('App', () => {
  it('app should return hello', () => {
    assert.equal(sayhello(), 'hello');
  });


  it('should return type string', () => {
    assert.typeOf(sayhello(), 'string');
  });

  it('number should be above 5 ', () => {
    const result = addnumbers(5, 5);
    assert.isAbove(result, 5);
  });
});
