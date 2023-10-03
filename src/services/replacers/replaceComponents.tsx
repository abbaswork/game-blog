import { RankLabel } from '@/components/core/rank-label/RankLabel';
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
export const replaceWithTitleWithRating = (domNode: Element): JSX.Element | Element => {

    //setup parent vars
    var tag: acceptedHeaderTags;

    //setup parsing vars
    var lastString: string;
    var newLastString: string;
    var newComponent: any;
    var rankComponent: any;

    //check if valid dom Object, if not return dom
    if (!(Object.values(acceptedHeaderTags) as string[]).includes(domNode.name)) {
        return domNode;
    } else {
        tag = acceptedHeaderTags[domNode.name as acceptedHeaderTags];
    }

    //parse component so that it can be accessed
    console.log('domNode: ', domNode.children);
    var compString = domToReact(domNode.children);

    //do not include support for a header tag with multiple elements to avoid user error
    if (!(typeof compString === "string")){
        return domNode;
    }

    //check if the last char is a number, if not return the normal header dom
    if (!isNaN(compString[compString.length - 1] as any)) {

        //extract ranknumber
        const rankNumber = compString.replace(/[^\d.-]/g, '');

        //create rank component
        rankComponent = <RankLabel rank={Number(rankNumber)} />

        //recreate the comp string but without the number
        compString = compString.replace(rankNumber, "");

    } else { //if not a number, return element
        return domNode;
    }


    //create header components and parse attribs on parent component
    const props = attributesToProps(domNode.attribs);
    const id = (compString.toLowerCase()).replaceAll(" ", "-");
    const headerObjs = headerComponents(id, { ...props }, rankComponent, compString);

    return headerObjs[tag];
}