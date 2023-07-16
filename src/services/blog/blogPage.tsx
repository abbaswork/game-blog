import { HeroImage } from '@/components/core/hero-image/HeroImage';
import { ListContainer } from '@/components/core/list-container/ListContainer';
import { Post, BlogMeta, ParsedContent } from '@/types';
import parse, { DOMNode, Element, attributesToProps, domToReact } from 'html-react-parser';



// the workaround: https://github.com/remarkablemark/html-react-parser/issues/616
// the bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is Element => {
    const isTag = ['tag', 'script'].includes(domNode.type);
    const hasAttributes = (domNode as Element).attribs !== undefined;
    const hasClass = hasAttributes && (domNode as Element).attribs.class !== undefined;

    return isTag && hasClass;
};


//Options to replace contents in the blog header
const parseBlogHeaderOptions = {
    replace: (domNode: DOMNode) => {

        //only render featured image
        if (isElement(domNode) && (domNode.attribs.class.includes('wp-block-post-featured-image'))) {
            const img = isElement(domNode.children[0]) ? domNode.children[0].attribs.src : "";
            const alt = isElement(domNode.children[0]) ? domNode.children[0].attribs.alt : "";
            return <HeroImage src={img} alt={alt} />
        }

        else
            return <></>
    }
}

//Options to replace contents in the blog body
const parseBlogBodyOptions = {
    replace: (domNode: DOMNode) => {

        //option to replace wordpress img tags with next images
        if (isElement(domNode) && domNode.attribs.class.includes('wp-block-image')) {
            return <HeroImage src="" alt="" />
        }

        //generate h2 tags with id's so that they can be linked to
        if (isElement(domNode) && domNode.attribs.class.includes('wp-block-heading')) {
            const props = attributesToProps(domNode.attribs);
            const comp = domToReact(domNode.children);
            const id = (comp + "").replaceAll(" ", "-");
            return (<h2 id={id} {...props}>{comp}</h2>);
        }

        //remove any featured images
        if (isElement(domNode) && (domNode.attribs.class.includes('wp-block-post-featured-image'))) {
            return <></>
        }
    }
}

export default class BlogPageService {

    //default params
    post: Post;
    content: ParsedContent;
    meta: BlogMeta;
    tableOfContents: React.JSX.Element;
    featuredImage: ParsedContent;

    //intialise & parse params
    constructor(post: Post) {
        const parsedContentBody: ParsedContent = this.parseContent(post.content.rendered);

        this.post = post;
        this.featuredImage = this.parseContent(post.content.rendered, parseBlogHeaderOptions)
        this.content = parsedContentBody;
        this.meta = this.parseBlogMeta(post);
        this.tableOfContents = this.parseTOC(parsedContentBody);
    }

    //take post and parse into parsedblog
    parseBlogMeta = (post: Post): BlogMeta => {
        return {
            title: post.title.rendered,
            slug: post.slug,
            date: post.date ? new Date(post.date).toDateString() : "",
        };
    }

    /**
     * Function that takes content object from worpdress blog and parses into array of react components
     * @param content 
     * @returns 
     */
    parseContent = (content: string, options = parseBlogBodyOptions): ParsedContent => {

        if (!content) //if empty string, don't parse
            return [];

        try { //filter out any new lines and parse html string into components
            const filterLines = content.replaceAll('\n', '');
            const parsedContent = parse(filterLines, options);
            return parsedContent;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * maps h2's to table of content
     */
    parseTOC = (content: ParsedContent): React.JSX.Element => {

        const tableOfContents: React.JSX.Element[] = [];

        //if empty contents are passed
        if (content === "" || (content as React.JSX.Element[]).length === 0)
            return <></>;

        //otherwise generate list items based on headers
        (content as React.JSX.Element[]).map((element: React.JSX.Element, index) => {
            if (element.type === 'h2') {
                tableOfContents.push(<li key={index}><a href={`#${element.props.id}`}>{element.props.children}</a></li>);
            }
        });

        //if no headers are found to link in toc, then return fragment
        if (tableOfContents.length === 0)
            return <></>

        return (
            <ListContainer title={"Table Of Contents"}>
                {tableOfContents}
            </ListContainer>
        );
    }
}