import { emptyPost, renderedHeadings, testPost } from '@/types/testTypes';
import BlogPageService from './blogPage';
import '@testing-library/jest-dom';
import { WPTags } from '@/services/utils';

const testOptions = {
  tags: [WPTags.FeatureBlogImage, WPTags.Heading, WPTags.PageImage, WPTags.PostCard],
  htmlContent: true
}

describe('BlogPageService', () => {
  const blogPageService = new BlogPageService(testPost);

  describe('parseContent', () => {

    it('When given empty string body return empty array', () => {
      expect(blogPageService.parseContent("", testOptions)).toHaveLength(0);
    });

    it('Render 5 html elements into Array and filter out new lines + spaces', () => {
      const result = blogPageService.parseContent(testPost.content.rendered, testOptions);
      expect(result).toHaveLength(2);
    });

    it('Ensure all array elements are HTML/React Elements', () => {
      const result = blogPageService.parseContent(testPost.content.rendered, testOptions);
      expect((result as JSX.Element[])[0].type).toBe('h2');
      expect((result as JSX.Element[])[1].type).toBe('p');
    });

  });

  describe('parseBlogMeta', () => {

    it('When given empty params, generate empty properties (incase of preview, draft, etc)', () => {
      const result = blogPageService.parseMeta(emptyPost);
      expect(result.slug).toBe("");
      expect(result.title).toBe("");
      expect(result.date).toBe("");
    });

    it('Ensure Meta Properties are generated correctly', () => {
      const result = blogPageService.parseMeta(testPost);
      expect(result.slug).toBe("hello-world-2");
      expect(result.title).toBe("Hello World 2");
      expect(result.date).toBe("Thu Jul 13 2023");
    });

  });

  describe('parseTOC', () => {

    it('When given array of empty elements, return <>', () => {
      const result = blogPageService.parseTOC([<></>]);
      expect(result).toStrictEqual(<></>);
    });

    it('When given array of elements that dont include header, return <>', () => {
      const result = blogPageService.parseTOC([<p key="1">test</p>, <p  key="2">test2</p>]);
      expect(result).toStrictEqual(<></>);
    });

    it('Ensure Table Of Contents is generated when headers are included in the component array', () => {
      const result = blogPageService.parseTOC([<h2 key="1">test</h2>, <h2 key="2">test2</h2>]);
      expect(result.props.children).toHaveLength(2);
    });

  });

})