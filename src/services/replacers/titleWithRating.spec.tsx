import { mockEmptyElement } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import {
  replaceWithTitleWithRating
} from './titleWithRating';
import '@testing-library/jest-dom';
import { RankLabel } from '@/components/core/rank-label/RankLabel';

describe('replaceComponents', () => {

  describe('replaceWithTitleWithRating', () => {

    it('When given empty Element, return the given Element without parsing', () => {
      expect(replaceWithTitleWithRating(mockEmptyElement)).toStrictEqual(mockEmptyElement);
    });

    it('When given non header tag Element, return the given Element without parsing', () => {
      const result = { ...mockEmptyElement, name: "em" } as Element;
      expect(replaceWithTitleWithRating(result)).toStrictEqual(result);
    });

    it('When given header tag with non text elements inside ie.em, return the given Element without parsing', () => {
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
      expect(replaceWithTitleWithRating(result)).toStrictEqual(result);
    });

    it('When given Element that consists of a text without number, return Element without parsing', () => {
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
      expect(replaceWithTitleWithRating(result)).toStrictEqual(result);
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
            data: 'Marvel Ultimate Alliance 1',
            type: 'text'
          }
        ]
      } as Element;
      expect(replaceWithTitleWithRating(result)).toStrictEqual(result);
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
      expect(replaceWithTitleWithRating(result)).toStrictEqual(
        <h2 id="marvel-ultimate-alliance-">Marvel Ultimate Alliance <RankLabel rank={1} /></h2>
      );
    });

  });

})

