const expect = require('expect');
const { isAcceptedString } = require('../utils/validate');

describe('isAcceptedString', () => {
  it('should not accept numbers', () => {
    const result = isAcceptedString(129880);

    expect(typeof result).toBe('boolean');
    expect(result).toBe(false);
  });

  it('should not accept objects', () => {
    const result = isAcceptedString({ test: 'test' });

    expect(typeof result).toBe('boolean');
    expect(result).toBe(false);
  });

  it('should not accept a string with just spaces', () => {
    const result = isAcceptedString('   ');

    expect(typeof result).toBe('boolean');
    expect(result).toBe(false);
  });

  it('should accept strings with spaces', () => {
    const result = isAcceptedString('  test  ');

    expect(typeof result).toBe('boolean');
    expect(result).toBe(true);
  });

  it('should accept strings containing numbers', () => {
    const result = isAcceptedString('123');

    expect(typeof result).toBe('boolean');
    expect(result).toBe(true);
  });
});
