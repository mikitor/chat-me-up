const expect = require('expect');
const { generateMsg } = require('./message');

describe('generateMsg', () => {
  it('should generate a message object', () => {
    const result = generateMsg('Admin', 'Test');

    expect(typeof result).toBe('object');
    expect(result.text).toBe('Test');
    expect(result.from).toBe('Admin');
    expect(typeof result.createdAt).toBe('number');
  });
});
