import { mockEmptyElement, mockOnlyText } from '@/types/testTypes';
import { Element } from 'html-react-parser';
import '@testing-library/jest-dom';
import { replaceRatingList } from './ratingList';


describe('replaceComponents', () => {

  describe('ratingLists', () => {

    it('When given empty Element, return false', () => {
      const result = replaceRatingList(mockEmptyElement);
      expect(result.valid).toBeFalsy();
    });

    it('When given list item without icon type and rating type, return defaults', () => {
      const comp = {
        ...mockEmptyElement, name: "ul", type: "tag", children: [
          { ...mockOnlyText}
        ] as any
      } as Element;
      const result = replaceRatingList(comp);
      expect(result).toStrictEqual({ valid: true, compProps: [ { index: 0, icon: 'swords', rating: 0 } ] });
    });

    it('When given list items that contain valid icon and rating, parse correctly', () => {
      const comp = {
        ...mockEmptyElement, name: "ul", type: "tag", children: [
          { ...mockOnlyText, data: "story /icon:gamepad/rating:5"}
        ] as any
      } as Element;
      const result = replaceRatingList(comp);
      expect(result).toStrictEqual({ valid: true, compProps: [ { index: 0, icon: 'gamepad', rating: 5 } ] });
    });

  });

})

