import { Page, Meta, ParsedContent, CategoryForPageType, PageProperties } from '@/types';
import parse, { DOMNode } from 'html-react-parser';
import { getImgAttribs, isElement } from '../utils';
import { HeroImage } from '@/components/core/hero-image/HeroImage';
import { GameTag } from '@/components/core/game-tag/GameTag';
import { replaceWithTitleWithRating } from '../replacers/titleWithRating';
import { PageTypes, WPPropertyTags, WPTags } from '@/constants';
import { replacePostCard } from '../replacers/postCard';
import { BlogCard, BlogCardProps } from '@/components/core/blog-card/BlogCard';
import { GameTagProps, ImgProps, RatingListProps, TitleWithRatingProps } from '@/constants/replacers';
import { replaceGameTags } from '../replacers/gameTag';
import { replaceRatingList } from '../replacers/ratingList';
import { RankLabel } from '@/components/core/rank-label/RankLabel';
import { ListContainer } from '@/components/core/list-container/ListContainer';
import { Icons } from '@/components/core/icons/Icon';
import { medalArray, icon as iconTypes } from '@/components/core/icons/types';
import { RatingIcons } from '@/components/core/rating-icons/RatingIcons';
import WordpressApi from '../api/wordpress';
import React from 'react';
import { replaceMeta } from '../replacers/MetaFields';

export enum tableOfContentIcons {
    BOOKMARKS = "bookmarks",
    MEDALS = "medals"
}

//supported options for a category
type categoryOptionsType = {
    tableOfContents: tableOfContentIcons | undefined
}

//supported names for a category
enum categoryOptionNames {
    HIDDEN_GEMS = "hidden-gems",
    BEST = "best",
    SPOTLIGHT = "spotlight"
}

//type for a category, where any of the above names are supported and use the same type for options
type categoryType = {
    [key in categoryOptionNames]: categoryOptionsType
}
/**
 * Defines options that can be used when rendering components in the page
 * these options are defined based on the category being used
 */
const categoryOptions: categoryType = {
    [categoryOptionNames.HIDDEN_GEMS]: { tableOfContents: tableOfContentIcons.MEDALS },
    [categoryOptionNames.BEST]: { tableOfContents: tableOfContentIcons.MEDALS },
    [categoryOptionNames.SPOTLIGHT]: { tableOfContents: undefined }
}

export default class PageService {

    //default page params
    post: Page;
    content: ParsedContent;
    meta: Meta;
    tableOfContents: React.JSX.Element;
    sidebar: React.JSX.Element | undefined;
    categoryPageOptions: categoryOptionsType | undefined;

    //property unique to page type (ie. blog, post)
    properties: PageProperties;

    //initialise WP Rest API
    API = new WordpressApi();

    /**
     * Initialise and parse default params in order
     * @param post 
     * @param parseContentOptions - useful for specific pages and classes that extend page
     */
    constructor(post: Page) {
        this.post = post;

        //filter and parse components, to use in other page properties
        const filterLines = post.content.rendered.replaceAll('\n', '');
        const parsedAllContent = parse(filterLines);

        //parse content into components
        const parseContent = this.parseContent(post.content.rendered);
        this.content = parseContent;

        //parse categories for page, useful for generating components based on page category (ie.In-depth blog, blog list)
        const parseCategory = post.categoryForPage ? this.parseCategory(post.categoryForPage) : undefined;
        this.categoryPageOptions = parseCategory;

        //extract meta properties for blog
        this.meta = this.parseMeta(post);
        this.tableOfContents = this.parseTOC(parseContent, parseCategory);

        this.properties = this.parsePageProperties(parsedAllContent as JSX.Element[]);

    }

    /**
     * Parse properties specific to a given page type
     * @param post :parsed React Components, that are then extracted into page properties,
     * these are not parsed into components so they can be set in templates per page type
     */
    parsePageProperties = (content: JSX.Element[]): PageProperties => {

        var properties: PageProperties = {};

        if (!content || content.length < 0)
            return properties;

        //map through content to find properties
        content.map(item => {
            const className = item.props.className;

            if (className === WPPropertyTags.FeatureBlogImage) {
                const { valid, compProps } = getImgAttribs(item.props.children.props);
                properties.featuredImage = valid ? <HeroImage priority={true} {...compProps as ImgProps} /> : undefined;
            }

            if (className === WPPropertyTags.MetaTitle) {
                const { valid, compProps } = replaceMeta(item.props.children, "meta-title");

                if (valid && compProps)
                    properties.metaTitle = compProps as string;
            }

            if (className === WPPropertyTags.MetaDescription) {
                const { valid, compProps } = replaceMeta(item.props.children, "meta-description");

                if (valid && compProps)
                    properties.metaDescription = compProps as string;
            }
        });

        return properties;
    }

    parseCategory(categoryForPage: CategoryForPageType): categoryOptionsType {
        return categoryOptions[categoryForPage.slug as categoryOptionNames];
    }

    //parse meta properties from wp pages
    parseMeta = (post: Page): Meta => {
        return {
            id: post.id,
            title: post.title.rendered,
            slug: post.slug,
            date: post.date ? new Date(post.date).toDateString() : "",
            tags: post.tags,
            type: post.type,
            categories: post.categories
        };
    }



    /**
     * Function that takes content object from wordpress blog and parses into array of react components
     * replaces specific components based on logic in component mapper
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
            let flagProperty = false;

            //filter out page properties instead of rendering
            Object.values(WPPropertyTags).forEach(tag => {
                if (className.includes(tag))
                    flagProperty = true;
            });

            if (flagProperty)
                return <></>

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
     * Function that returns sidebar based on related blog logic
     * @param meta 
     * @returns 
     */
    parseSidebar = async (meta: Meta) => {
        //use existing tags to find similiar blogs that can be showcased in related blogs
        var content: JSX.Element | JSX.Element[];

        //check if blog page, in which case return list of blogs that 
        if (meta.type === PageTypes.post) {

            //default to no blogs found
            content = <p>No related blogs found, please check back later</p>;

            //get list of blogs that also contain the same tag and filter out content
            if (meta.tags && meta.tags.length > 0) {
                var relatedBlogs = await this.API.getBlogs({ tags: meta.tags, filter: "content", exclude: [meta.id] });

                //if blogs were found, map them in links
                if (relatedBlogs)
                    content = relatedBlogs.map((blog, index) => { return (<a key={index} href={blog.slug}>{"- " + blog.title.rendered}</a>) });
            }
        }

        //if not a blog page, return default text
        else
            content = <p>Please click on a blog, to see recommendations</p>


        //render content through sidbar
        return (
            <ListContainer title='Related Blogs' className='sidebar'>
                {content}
            </ListContainer>
        );
    }

    /**
     * After content has been parsed, filter through h2 components to create table of contents
     * @param content 
     * @returns 
     */
    parseTOC = (content: ParsedContent, options?: categoryOptionsType): React.JSX.Element => {

        const tableOfContents: React.JSX.Element[] = [];

        //if empty contents are passed
        if (content === "" || (content as React.JSX.Element[]).length === 0)
            return <></>;

        //otherwise generate list items based on headers
        var tocIndex = 0;
        (content as React.JSX.Element[]).map((element: React.JSX.Element, index) => {
            if (element.type === 'h2') {
                var icon: JSX.Element | string;

                //configure icons for TOC based on the category
                switch (options?.tableOfContents) {

                    case tableOfContentIcons.MEDALS:
                        icon = tocIndex < 3 ? <Icons icon={medalArray[tocIndex]} /> : <strong style={{ paddingLeft: "0.5rem", paddingRight: "0.2rem" }}>{tocIndex + 1 + "."}</strong>;
                        break;

                    case tableOfContentIcons.BOOKMARKS:
                        icon = <strong style={{ paddingLeft: "0.5rem", paddingRight: "0.2rem" }}>{tocIndex + 1 + "."}</strong>
                        break;

                    default:
                        icon = <></>;
                        break;
                }

                tableOfContents.push(<li key={index}><a style={{ fontSize: "1.1rem" }} href={`#${element.props.id}`}>{icon}{element.props.children[0]}</a></li>);
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