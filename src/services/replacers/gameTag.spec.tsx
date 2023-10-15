import { mockEmptyElement, mockOnlyText } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import '@testing-library/jest-dom';
import { replaceGameTags } from './gameTag';


describe('replaceComponents', () => {

  describe('gameTag', () => {

    it('When given empty Element, return false', () => {
      const result = replaceGameTags(mockEmptyElement);
      expect(result.valid).toBeFalsy();
    });

    it('When given list with list items that contain only text, parse correctly', () => {
      const comp = {
        ...mockEmptyElement, name: "ul", type: "tag", children: [
          { ...mockOnlyText}
        ] as any
      } as Element;
      const result = replaceGameTags(comp);

      expect(result).toStrictEqual({ valid: true, compProps: [ { index: 0, text: 'testing' } ] });
    });

    it('When given list items that contains bolding text, parse only text', () => {
      const comp = {
        ...mockEmptyElement, name: "ul", type: "tag", children: [
          { ...mockEmptyElement, type: "tag", name: "em", children: [{ ...mockOnlyText}] }
        ] as any
      } as Element;
      const result = replaceGameTags(comp);
      expect(result).toStrictEqual({ valid: true, compProps: [ { index: 0, text: 'testing' } ] });
    });

  });

})

