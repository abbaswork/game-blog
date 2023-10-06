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