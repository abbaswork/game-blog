import { Page, Meta, ParsedContent, ReplaceOptions } from '@/types';
import parse, { DOMNode, attributesToProps, domToReact } from 'html-react-parser';
import { WPTags, getBlogCardAttribs, getImgAttribs, isElement } from '../utils';
import { HeroImage } from '@/components/core/hero-image/HeroImage';
import { BlogCard } from '@/components/core/blog-card/BlogCard';

const parsePageBodyOptions: ReplaceOptions = {
    tags: [WPTags.Heading, WPTags.FeatureBlogImage, WPTags.PageImage, WPTags.PostCard],
    htmlContent: true
}


export default class PageService {

    //default page params
    post: Page;
    content: ParsedContent;
    meta: Meta;

    /**
     * Initialise and parse default params
     * @param post 
     * @param parseContentOptions - useful for specific pages and classes that extend page
     */
    constructor(post: Page, parseContentOptions: ReplaceOptions = parsePageBodyOptions) {
        this.post = post;
        this.content = this.parseContent(post.content.rendered, parseContentOptions);
        this.meta = this.parseMeta(post);
    }

    //take post and parse into parsedblog
    parseMeta = (post: Page): Meta => {
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
    parseContent = (content: string, options: ReplaceOptions): ParsedContent => {

        if (!content) //if empty string, don't parse
            return [];

        try { //filter out any new lines and parse html string into components
            const filterLines = content.replaceAll('\n', '');
            const parsedContent = parse(filterLines, {
                replace: (domNode: DOMNode) => this.mapComponents(domNode, options.tags, options.htmlContent)
            });
            return parsedContent;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * Component mapper that maps by replacing the HTML element with its component based on the options given
     * this includes replacing a component with nothing, if it's meant not to be rendered
     * @param domNode 
     * @param accept - array of tags for elements meant to be transformed
     * @param htmlContent - html elements that are not meant to be transformed - usually includes text ie.strong, p, etc
     * @returns 
     */
    mapComponents = (domNode: DOMNode, accept: WPTags[], htmlContent: boolean) => {

        //check if node passed is an element
        if (isElement(domNode)) {

            //element components with classNames, meant to be parsed differently
            let className = domNode.attribs.class;
            let acceptString = accept.toString();

            if (className.includes(WPTags.PostCard)) {
                if (acceptString.includes(WPTags.PostCard)) {
                    const props = getBlogCardAttribs(domNode);
                    console.log('props: ', props);
                    return <BlogCard {...props}/>
                } else {
                    return <></>
                }
            }


            //if this specific component is being parsed, then parse it, if it's not included in options, return nothing
            if (className === WPTags.FeatureBlogImage) {
                if (acceptString.includes(WPTags.FeatureBlogImage)) {
                    const props = getImgAttribs(domNode.children[0]);
                    return <HeroImage {...props} />
                } else {
                    return <></>
                }
            }

            if (className.includes(WPTags.PageImage)) {
                if (acceptString.includes(WPTags.PageImage)) {
                    const props = getImgAttribs(domNode.children[0]);
                    return <HeroImage {...props} />
                } else {
                    return <></>;
                }
            }

            if (className.includes(WPTags.Heading)) {
                if (acceptString.includes(WPTags.Heading)) {
                    const props = attributesToProps(domNode.attribs);
                    const comp = domToReact(domNode.children);
                    const id = (comp + "").replaceAll(" ", "-");
                    return (<h2 id={id} {...props}>{comp}</h2>);
                } else {
                    return <></>
                }
            }
        }

        //if not returning html content, dont return text or element type components
        if (htmlContent === false) {
            return <></>;
        }
    }
}