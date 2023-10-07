import { mockEmptyElement } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import {
  replaceWithTitleWithRating
} from './titleWithRating';
import '@testing-library/jest-dom';
import { RankLabel } from '@/components/core/rank-label/RankLabel';

describe('replaceComponents', () => {

  describe('replaceWithTitleWithRating', () => {

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
          Element as any, {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            children: [
              Text as any, {
                parent: null,
                prev: null,
                next: null,
                startIndex: null,
                endIndex: null,
                data: 'Marvel Ultimate Alliance',
                type: 'text'
              }
            ],
            name: 'em',
            attribs: {},
            type: 'tag'
          },
        ]
      } as Element;
      const { valid } = replaceWithTitleWithRating(result);
      expect(valid).toBeFalsy();
    });

    it('When given Element that consists of a text without number, return invalid', () => {
      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          Text as any, {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            data: 'Marvel Ultimate Alliance',
            type: 'text'
          }
        ]
      } as Element;
      const { valid } = replaceWithTitleWithRating(result);
      expect(valid).toBeFalsy();
    });

    it('When given Element that consists of a text with number but is missing slash, return invalid', () => {
      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            data: 'Marvel Ultimate Alliance 1',
            type: 'text'
          }
        ]
      } as Element;
      const { valid } = replaceWithTitleWithRating(result);
      expect(valid).toBeFalsy();

    });


    it('When given Element that consists of a text with number but is missing slash, return Element without parsing', () => {
      const result = {
        ...mockEmptyElement, name: "h2",
        children: [
          {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            data: 'Marvel Ultimate Alliance /1',
            type: 'text'
          }
        ]
      } as Element;
      const { valid } = replaceWithTitleWithRating(result);
      expect(valid).toBeTruthy();

    });

  });

})

