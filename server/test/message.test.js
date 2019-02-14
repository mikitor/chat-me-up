const expect = require('expect');
const { generateMsg, generateLocationMsg } = require('../utils/message');

describe('generateMsg', () => {
  it('should generate a message object', () => {
    const result = generateMsg('Admin', 'Test');

    expect(typeof result).toBe('object');
    expect(result.text).toBe('Test');
    expect(result.from).toBe('Admin');
    expect(typeof result.createdAt).toBe('number');
  });
});

describe('generateLocationMsg', () => {
  it('should generate a location object', () => {
    const from = 'Ad';
    const lat = '47';
    const lng = '12';
    const url = 'https://www.google.com/maps/search/?api=1&query=47,12';
    const result = generateLocationMsg(from, lat, lng);

    expect(typeof result).toBe('object');
    expect(result.from).toBe(from);
    expect(result.url).toBe(url);
    expect(typeof result.createdAt).toBe('number');
  });
});
