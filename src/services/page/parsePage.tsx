import { Page, Meta, ParsedContent } from '@/types';
import parse, { DOMNode } from 'html-react-parser';
import { getImgAttribs, isElement } from '../utils';
import { HeroImage } from '@/components/core/hero-image/HeroImage';
import { GameTag } from '@/components/core/game-tag/GameTag';
import { replaceWithTitleWithRating } from '../replacers/titleWithRating';
import { WPPropertyTags, WPTags } from '@/constants';
import { replacePostCard } from '../replacers/postCard';
import { BlogCard, BlogCardProps } from '@/components/core/blog-card/BlogCard';
import { GameTagProps, ImgProps, RatingListProps, TitleWithRatingProps } from '@/constants/replacers';
import { replaceGameTags } from '../replacers/gameTag';
import { replaceRatingList } from '../replacers/ratingList';
import { RankLabel } from '@/components/core/rank-label/RankLabel';
import { ListContainer } from '@/components/core/list-container/ListContainer';
import { Icons } from '@/components/core/icons/Icon';
import { medalArray } from '@/components/core/icons/types';
import { RatingIcons } from '@/components/core/rating-icons/RatingIcons';

export default class PageService {

    //default page params
    post: Page;
    content: ParsedContent;
    meta: Meta;
    featuredImage: ParsedContent | undefined;
    tableOfContents: React.JSX.Element;

    /**
     * Initialise and parse default params
     * @param post 
     * @param parseContentOptions - useful for specific pages and classes that extend page
     */
    constructor(post: Page) {
        const parseContent = this.parseContent(post.content.rendered);
        this.post = post;
        this.content = parseContent;
        this.meta = this.parseMeta(post);
        this.tableOfContents = this.parseTOC(parseContent);
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
    parseContent = (content: string): ParsedContent => {

        if (!content) //if empty string, don't parse
            return [];

        try { //filter out any new lines and parse html string into components
            const filterLines = content.replaceAll('\n', '');
            const parsedContent = parse(filterLines, {
                replace: (domNode: DOMNode) => this.mapComponents(domNode)
            });
            return parsedContent;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * Component mapper that maps by replacing the HTML element with its component
     * this implementation is in charge of mapping WP HTML Elements to React Components
     * currently, this is done by mapping through classnames as id's.
     * @param domNode 
     * @param accept - array of tags for elements meant to be transformed
     * @param htmlContent - html elements that are not meant to be transformed - usually includes text ie.strong, p, etc
     * @returns 
     */
    mapComponents = (domNode: DOMNode) => {

        //check if node passed is an element
        if (isElement(domNode)) {

            //Current implementation parses component based on classname as id
            let className = domNode.attribs.class;

            //Set Page Properties by checking page property tags
            if (className === WPPropertyTags.FeatureBlogImage) {
                const { valid, compProps } = getImgAttribs(domNode.children[0]);
                this.featuredImage = valid ? <HeroImage priority={true} {...compProps as ImgProps} /> : undefined;
                return <></>;
            }

            //set Page Components by checking the WP Tags
            if (className.includes(WPTags.PostCard)) {
                //get props first through handlers that can be unit tested, then pass to component
                const { valid, compProps } = replacePostCard(domNode);
                return valid ? <BlogCard {...compProps as BlogCardProps} /> : domNode;
            }

            if (className.includes(WPTags.PageImage)) {
                const { valid, compProps } = getImgAttribs(domNode.children[0]);
                return valid ? <HeroImage {...compProps as ImgProps} /> : domNode;
            }

            if (className.includes(WPTags.TitleWithRating)) {
                const { valid, id, compProps } = replaceWithTitleWithRating(domNode);
                return valid ?
                    <h2 id={id}>
                        {(compProps as TitleWithRatingProps).text}
                        <RankLabel rank={Number((compProps as TitleWithRatingProps).rank)} />
                    </h2>
                    : domNode;
            }

            if (className.includes(WPTags.RatingList)) {
                //parse list of game tags
                const { valid, compProps } = replaceRatingList(domNode);

                if (valid) { //if valid return list items in game tags
                    const gameTags = (compProps as RatingListProps[]).map(tag => {
                        return <li className='rating-item' key={tag.index}>
                            <span>{tag.text}</span>
                            <RatingIcons rank={tag.rating} icon={tag.icon} />
                        </li>
                    });
                    return <ul className='rating-list'>{gameTags}</ul>
                }

                //else just return the original obj
                return domNode;
            }

            if (className.includes(WPTags.GameTags)) {

                //parse list of game tags
                const { valid, compProps } = replaceGameTags(domNode);

                if (valid) { //if valid return list items in game tags
                    const gameTags = (compProps as GameTagProps[]).map(tag => {
                        return <li key={tag.index}><GameTag>{tag.text}</GameTag></li>
                    });
                    return <ul className='horizontal-list'>{gameTags}</ul>
                }

                //else just return the original obj
                return domNode;
            }
        }
    }


    /**
     * After content has been parsed, filter through h2 components to create table of contents
     * @param content 
     * @returns 
     */
    parseTOC = (content: ParsedContent): React.JSX.Element => {

        const tableOfContents: React.JSX.Element[] = [];

        //if empty contents are passed
        if (content === "" || (content as React.JSX.Element[]).length === 0)
            return <></>;

        //otherwise generate list items based on headers
        var tocIndex = 0;
        (content as React.JSX.Element[]).map((element: React.JSX.Element, index) => {
            if (element.type === 'h2') {
                tableOfContents.push(<li key={index}><a href={`#${element.props.id}`}>{tocIndex < 3 ? <Icons icon={medalArray[tocIndex]} /> : (<span style={{ paddingLeft: "0.5rem" }}>{tocIndex + 1 + ". "}</span>)}{element.props.children[0]}</a></li>);
                tocIndex++;
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