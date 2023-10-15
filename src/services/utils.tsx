import { ReplaceProps } from '@/constants/replacers';
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
export const getImgAttribs = (domNode: DOMNode): ReplaceProps => {

    //check if img attribs are present
    if (!(domNode as Element).attribs.src)
        return { valid: false };

    return {
        valid: true,
        compProps: {
            src: (domNode as Element).attribs.src,
            alt: (domNode as Element).attribs.alt || "",
        }
    }
}

export const enum stringTags {
    ICON = "icon",
    RATING = "rating"
}

export const getStringProperties = (parseString: string, tags: stringTags[]): {
    [stringTags.ICON]?: string
    [stringTags.RATING]?: number,
    originalText: string
} => {

    //split the string using the split param
    const tokens = parseString.split("/");
    var returnTags = {};

    tokens.map(token => {

        //map through tags until token is found to include tag
        tags.map(tag => {

            if (token.toLowerCase().includes(tag)) {
                //split the token using : and assign to return
                const param = token.split(":");
                returnTags = { ...returnTags, [tag]: param[1] };
            }

        })
    });

    //console.log('return Tags: ', returnTags);
    return {originalText: tokens[0], ...returnTags};

}