import { mockEmptyElement, mockOnlyText } from '@/constants/tests';
import { Element } from 'html-react-parser';
import {
  replaceWithTitleWithRating
} from './titleWithRating';
import '@testing-library/jest-dom';

describe('replaceComponents', () => {

  describe('titleWithRating', () => {

    it('When given empty Element, return invalid', () => {
      const { valid } = replaceWithTitleWithRating(mockEmptyElement);
      expect(valid).toBeFalsy();
    });

    it('When given non header tag Element, return invalid', () => {
      const { valid } = replaceWithTitleWithRating({ ...mockEmptyElement, name: "em" } as Element);
      expect(valid).toBeFalsy();
    });

    it('When given header tag with non text elements inside ie.em, return invalid', () => {
      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          {
            ...mockEmptyElement,
            children: [
              {
                parent: mockEmptyElement,
                data: 'Marvel Ultimate Alliance',
                type: 'text'
              }
            ],
            name: 'em',
            type: 'tag'
          },
        ]
      } as Element;
      const { valid } = replaceWithTitleWithRating(result);
      expect(valid).toBeFalsy();
    });

    it('When given Element that consists of text, with no /rating, set default to 0', () => {
      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          {
            ...mockOnlyText,
            data: 'Marvel Ultimate Alliance',
          } as any
        ]
      } as Element;
      const { compProps } = replaceWithTitleWithRating(result);
      expect(compProps).toStrictEqual({ text: 'Marvel Ultimate Alliance', rank: 0 });
    });

    it('When given Element that consists of text and /rating, parse properties correctly', () => {

      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          { ...mockOnlyText, data: 'Marvel Ultimate Alliance /rating:1', }
        ] as any
      } as Element;
      const { valid, compProps } = replaceWithTitleWithRating(result);

      expect(valid).toBeTruthy();
      expect(compProps).toStrictEqual({ text: 'Marvel Ultimate Alliance ', rank: '1' });

    });

  });

})

