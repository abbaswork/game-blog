import { mockEmptyElement } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import '@testing-library/jest-dom';
import { replacePostCard } from './postCard';

describe('replaceComponents', () => {

  describe('postCard', () => {

    it('When given empty Element, return false', () => {
      expect(replacePostCard(mockEmptyElement)).toBeFalsy();
    });

    it('When given non post element, return false', () => {
      const result = { ...mockEmptyElement, name: "em" } as Element;
      expect(replacePostCard(result)).toBeFalsy();
    });

    it('When given post element with missing required elements, return false', () => {
      const result = { ...mockEmptyElement, name: "li", type: "tag" } as Element;
      expect(replacePostCard(result)).toBeFalsy();
    });

    it('When give post element with required elements, parse correctly', () => {
      const result = {
        ...mockEmptyElement, name: "li", type: "tag", children: [
          { ...mockEmptyElement, type: "tag", name: "img", attribs: { src: "test", alt: "test" } },
          { ...mockEmptyElement, type: "tag", name: "a", attribs: { href: "www.test.com" } },
          { ...mockEmptyElement, parent: { ...mockEmptyElement, name: "a" }, data: "test" },
        ] as any
      } as Element;
      expect(replacePostCard(result)).toStrictEqual({ src: 'test', title: 'test', alt: 'test', href: 'www.test.com' });
    });

  });

})

