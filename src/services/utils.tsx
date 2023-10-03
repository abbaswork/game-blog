import { DOMNode, Element } from 'html-react-parser';

// the workaround: https://github.com/remarkablemark/html-react-parser/issues/616
// the bug: https://github.com/remarkablemark/html-react-parser/issues/633
export const isElement = (domNode: DOMNode): domNode is Element => {
    const isTag = ['tag', 'script'].includes(domNode.type);
    const hasAttributes = (domNode as Element).attribs !== undefined;
    const hasClass = hasAttributes && (domNode as Element).attribs.class !== undefined;

    return isTag && hasClass;
};

/**
 * classes that represent elements that have components meant to replace them
 */
export enum WPTags {
    FeatureBlogImage = "wp-block-post-featured-image",
    PageImage = "wp-block-image",
    TitleWithRating = "title-with-rating",
    PostCard = "post type-post status-publish",
    RatingList = "rating-list",
    GameTags = "game-tags"
}

/**
 * Simple util that extracts img properties from a node
 * @param domNode 
 * @returns 
 */
export const getImgAttribs = (domNode: DOMNode) => {
    return {
        src: (domNode as Element).attribs.src || "",
        alt: (domNode as Element).attribs.alt || "",
    }
}

/**
 * Simple util that extracts img properties from a node
 * @param domNode 
 * @returns 
 */
export const getBlogCardAttribs = (domNode: DOMNode) => {
    if (isElement(domNode)) {
        const container = domNode.children[0];

        const imgContainer = domNode.children[1];
        const imgLink = (imgContainer as Element).children[0];
        const img = (imgLink as Element).children[0];

        const titleLink = (container as Element).children[0];
        const title = (titleLink as Element).children[0];

        const pContainer = domNode.children[2];
        const paragraph = (pContainer as Element).children[0];
        const pText = paragraph ? (paragraph as Element).children[0] : "";

        return {
            src: (img as Element).attribs ? (img as Element).attribs.src : "",
            alt: (img as Element).attribs ? (img as Element).attribs.alt : "",
            title: (title as any).data,
            href: `/blog/${((title as any).data + "").replaceAll(" ", "-").toLocaleLowerCase()}`,
            description: pText ? (pText as any).data : "",
        }

    }

    return {
        src: "",
        alt: "",
        title: "",
        href: "",
        description: "",
    }
}