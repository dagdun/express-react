const example = require('../../libs/example')

describe('example test function', () => {
  it('should be int', () => {
    expect(example(4)).toEqual(40)
  })
})
