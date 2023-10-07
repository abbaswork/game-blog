import { mockEmptyElement } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import '@testing-library/jest-dom';
import { replacePostCard } from './postCard';

describe('replaceComponents', () => {

  describe('postCard', () => {

    it('When given empty Element, return false', () => {
      const result = replacePostCard(mockEmptyElement);
      expect(result.valid).toBeFalsy();
    });

    it('When given non post element, return false', () => {
      const comp = { ...mockEmptyElement, name: "em" } as Element;
      const result = replacePostCard(comp);

      expect(result.valid).toBeFalsy();
    });

    it('When given post element with missing required elements, return false', () => {
      const comp = { ...mockEmptyElement, name: "li", type: "tag" } as Element;
      const result = replacePostCard(comp);
      expect(result.valid).toBeFalsy();
    });

    it('When give post element with required elements, parse correctly', () => {
      const comp = {
        ...mockEmptyElement, name: "li", type: "tag", children: [
          { ...mockEmptyElement, type: "tag", name: "img", attribs: { src: "test", alt: "test" } },
          { ...mockEmptyElement, type: "tag", name: "a", attribs: { href: "www.test.com" } },
          { ...mockEmptyElement, parent: { ...mockEmptyElement, name: "a" }, data: "test" },
        ] as any
      } as Element;
      const result = replacePostCard(comp);
      expect(result).toStrictEqual({valid: true, compProps: { src: 'test', title: 'test', alt: 'test', href: 'www.test.com' }});
    });

  });

})

