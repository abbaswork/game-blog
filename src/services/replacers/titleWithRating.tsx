import { RankLabel } from '@/components/core/rank-label/RankLabel';
import { ElementText, ReplaceProps, TitleWithRatingProps } from '@/constants/replacers';
import { Element, attributesToProps, domToReact } from 'html-react-parser';
import { getStringProperties, stringTags } from '../utils';

enum acceptedHeaderTags {
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5"
}

/**
 * Function that replaces text tag ie. <h1>,<h2>...
 * with ranked number grabbed from the end of the text
 * parses into React component
 * In the event where the number does not exist, return the original
 * @param domNode 
 */
export const replaceWithTitleWithRating = (domNode: Element): ReplaceProps => {

    //check if valid dom Object, if not return dom
    if (!(Object.values(acceptedHeaderTags) as string[]).includes(domNode.name)) {
        return { valid: false, compProps: undefined };
    }

    const child = domNode.children[0] as Element;

    //do not include support for a header tag with multiple elements just check for a string
    if (!child.name && child.parent) {
        const properties = getStringProperties((child as ElementText).data, [stringTags.RATING]);
        const id = (properties.originalText.toLowerCase()).replaceAll(" ", "-");
        const title: TitleWithRatingProps = { text: properties.originalText || "", rank: properties.rating || 0 };
        return { id, compProps: title, valid: true }
    } else {
        return { valid: false };
    }
}