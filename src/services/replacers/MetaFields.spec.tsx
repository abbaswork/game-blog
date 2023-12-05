import { replaceMeta } from './MetaFields';
import '@testing-library/jest-dom';

describe('MetaFields', () => {

  it('When given empty Element, return valid operation as false', () => {
    const { valid } = replaceMeta("", "/");
    expect(valid).toBeFalsy();
  });

  it('When given string without token, return false ', () => {
    const { valid } = replaceMeta("/meta-title: test", "");
    expect(valid).toBeFalsy();
  });

  it('When given a string with token, parse field without whitespaces', () => {
    const { valid, compProps } = replaceMeta("/meta-title: test", "meta-title");
    expect(valid).toBeTruthy();
    expect(compProps).toBe("test");
  });

});
