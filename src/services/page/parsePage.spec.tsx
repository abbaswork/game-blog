import { emptyPost, testPost } from '@/types/testTypes';
import PageService from './parsePage';
import '@testing-library/jest-dom';

describe('PageService', () => {
  const pageService = new PageService(testPost);

  describe('parseContent', () => {

    it('When given empty string body return empty array', () => {
      expect(pageService.parseContent("")).toHaveLength(0);
    });

    it('Render 5 html elements into Array and filter out new lines + spaces', () => {
      const result = pageService.parseContent(testPost.content.rendered);
      expect(result).toHaveLength(2);
    });

    it('Ensure all array elements are HTML/React Elements', () => {
      const result = pageService.parseContent(testPost.content.rendered);
      expect((result as JSX.Element[])[0].type).toBe('h2');
      expect((result as JSX.Element[])[1].type).toBe('p');
    });

  });

  describe('parseMeta', () => {

    it('When given empty params, generate empty properties (incase of preview, draft, etc)', () => {
      const result = pageService.parseMeta(emptyPost);
      expect(result.slug).toBe("");
      expect(result.title).toBe("");
      expect(result.date).toBe("");
    });

    it('Ensure Meta Properties are generated correctly', () => {
      const result = pageService.parseMeta(testPost);
      expect(result.slug).toBe("hello-world-2");
      expect(result.title).toBe("Hello World 2");
      expect(result.date).toBe("Thu Jul 13 2023");
    });

  });

  describe('parseTOC', () => {

    it('When given array of empty elements, return <>', () => {
      const result = pageService.parseTOC([<></>]);
      expect(result).toStrictEqual(<></>);
    });

    it('When given array of elements that dont include header, return <>', () => {
      const result = pageService.parseTOC([<p key="1">test</p>, <p  key="2">test2</p>]);
      expect(result).toStrictEqual(<></>);
    });

    it('Ensure Table Of Contents is generated when headers are included in the component array', () => {
      const result = pageService.parseTOC([<h2 key="1">test</h2>, <h2 key="2">test2</h2>]);
      expect(result.props.children).toHaveLength(2);
    });

  });

})