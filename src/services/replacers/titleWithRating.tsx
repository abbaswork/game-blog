import { RankLabel } from '@/components/core/rank-label/RankLabel';
import { ReplaceProps } from '@/constants/replacers';
import { Element, attributesToProps, domToReact } from 'html-react-parser';

enum acceptedHeaderTags {
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5"
}

//util object that maps parent component
const headerComponents = (id: string, props: any, rank: any, children: any) => {
    return {
        "h1": <h1 id={id} {...props}>{children}{rank}</h1>,
        "h2": <h2 id={id} {...props}>{children}{rank}</h2>,
        "h3": <h3 id={id} {...props}>{children}{rank}</h3>,
        "h4": <h4 id={id} {...props}>{children}{rank}</h4>,
        "h5": <h5 id={id} {...props}>{children}{rank}</h5>
    }
}


/**
 * Function that replaces text tag ie. <h1>,<h2>...
 * with ranked number grabbed from the end of the text
 * parses into React component
 * In the event where the number does not exist, return the original
 * @param domNode 
 */
export const replaceWithTitleWithRating = (domNode: Element): ReplaceProps => {

    //setup parent vars
    var tag: acceptedHeaderTags;

    //setup parsing vars
    var tokenString: String[];
    var rankComponent: any;

    //check if valid dom Object, if not return dom
    if (!(Object.values(acceptedHeaderTags) as string[]).includes(domNode.name)) {
        return { valid: false, compProps: undefined };
    } else {
        tag = acceptedHeaderTags[domNode.name as acceptedHeaderTags];
    }

    //parse component so that it can be accessed
    var compString = domToReact(domNode.children);

    //do not include support for a header tag with multiple elements to avoid user error
    if (!(typeof compString === "string")) {
        return { valid: false };
    }

    //check if the last char is a number, if not return the normal header dom
    if (!isNaN(compString[compString.length - 1] as any) && compString.includes("/")) {

        //extract rank number by splitting the string
        tokenString = compString.split("/");
        const rankNumber = tokenString[1];

        //create rank component
        rankComponent = <RankLabel rank={Number(rankNumber)} />

    } else { //if not a number, return element
        return { valid: false };
    }


    //create header components and parse attribs on parent component
    const props = attributesToProps(domNode.attribs);
    const id = (tokenString[0].toLowerCase()).replaceAll(" ", "-");
    const children = <>{rankComponent}{tokenString[0]}</>;

    return { valid: true, id: id, children: children };
}