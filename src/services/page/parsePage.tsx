import { Page, Meta, ParsedContent, ReplaceOptions } from '@/types';
import parse, { DOMNode, attributesToProps, domToReact } from 'html-react-parser';
import { WPTags, getBlogCardAttribs, getImgAttribs, isElement } from '../utils';
import { HeroImage } from '@/components/core/hero-image/HeroImage';
import { BlogCard } from '@/components/core/blog-card/BlogCard';
import { RankLabel } from '@/components/core/rank-label/RankLabel';
import { GameTag } from '@/components/core/game-tag/GameTag';
import { RatingIcons } from '@/components/core/rating-icons/RatingIcons';
import { RatingIconsTypes } from '@/components/core/rating-icons/types';
import { replaceWithTitleWithRating } from '../replacers/replaceComponents';

const parsePageBodyOptions: ReplaceOptions = {
    tags: [WPTags.TitleWithRating, WPTags.FeatureBlogImage, WPTags.PageImage, WPTags.PostCard],
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

    //parse meta properties from wp pages
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

        //TODO: Setup default page parser
        //TODO: setup system that relies on on WP to setup templates + components for a page

        //check if node passed is an element
        if (isElement(domNode)) {

            //element components with classNames, meant to be parsed differently
            let className = domNode.attribs.class;
            let tag = domNode.tagName;
            let acceptString = accept.toString();

            if (className.includes(WPTags.PostCard)) {
                if (acceptString.includes(WPTags.PostCard)) {
                    const props = getBlogCardAttribs(domNode);
                    return <BlogCard {...props} />
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

            //TODO: Switch for a switch statement
            if (className.includes(WPTags.TitleWithRating)) {
                return replaceWithTitleWithRating(domNode);
            }

            if (className.includes(WPTags.RatingList)) {
                if (acceptString.includes(WPTags.RatingList)) {

                    //array of list items to render
                    var listItems: JSX.Element[] = [];
                    const children = domNode.children;

                    //for each child extract text items and render in list item
                    children.map((listItem) => {
                        const listItemNode = (listItem as any).children as DOMNode[];
                        var listText = domToReact(listItemNode);
                        var lastText: string = "";
                        var index = 0;
                        var rating = "";
                        var icon: RatingIconsTypes = RatingIconsTypes.swords;

                        //if the text is a string vs array of strings
                        if ((typeof listText) === "string") {
                            //get rating from string
                            lastText = listText as string;
                            rating = lastText[lastText.length - 1];

                            //replace list text string
                            listText = lastText.replace(rating, "");
                        } else {
                            //get rating from last string in array
                            var anyText = listText as any;
                            index = anyText.length - 1;
                            lastText = anyText[index];
                            var rating = lastText.replace(/\D/g, '');

                            if (anyText[0] && anyText[0].props && anyText[0].props.children.includes("Players")) {
                                icon = RatingIconsTypes.gamepad;
                            }

                            //replace number in last string
                            lastText.replace(rating, "");
                            anyText[index] = lastText.replace(rating, "");
                            listText = anyText;
                        }

                        listItems.push(<li className='rating-item'><span>{listText}</span><RatingIcons rank={Number(rating)} icon={icon} /></li>);

                    });

                    return (
                        <ul className='rating-list'>
                            {listItems}
                        </ul>
                    );
                } else {
                    return <></>
                }
            }

            if (className.includes(WPTags.GameTags)) {
                if (acceptString.includes(WPTags.GameTags)) {

                    var listItems: JSX.Element[] = [];
                    const children = domNode.children;

                    children.map((listItem) => {
                        if ((listItem as any).children[0]) {
                            const text = (listItem as any).children[0].data as string;
                            listItems.push(<li><GameTag>{text}</GameTag></li>);
                        }
                    });

                    return (<ul className='horizontal-list'>{listItems}</ul>)
                        ;
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