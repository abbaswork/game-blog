import { wpPreviewHeaders } from '@/config/api';
import { transformTitleUrl } from '../utils';
import { NavSearchType, blogItem, menuItem, menuLinkProps, searchResults, tagItem } from './types';

/**
 * This service handles navigation operations so that it can be used within any component
 * It leverages Next to cache and optimize performance as much as possible
 * Strategy:
 * - cache operations that don't change on the server side (this means this service needs to be rendered in a server side component or page/layout file)
 * - functions that need to be rendered within a component can leverage the existing data
 */
export default class NavigationService {

    //default page params
    menuLinks: menuLinkProps[];
    tags: tagItem[];

    /**
     * Initialise and parse default params
     * @param post 
     * @param parseContentOptions - useful for specific pages and classes that extend page
     */
    constructor(menuItems: menuItem[], tags: tagItem[]) {
        this.menuLinks = this.parseLinks(menuItems);
        this.tags = tags;

        console.log("menuLinks: ", menuItems[0]._links);

        // blogItems.map(blog => console.log({
        //     generated_slug: blog.generated_slug,
        //     meta: blog.meta,
        //     tags: blog.tags,
        //     categories: blog.categories
        // }))
    }

    //parse meta properties from wp pages
    parseLinks = (menuItems: menuItem[]): menuLinkProps[] => {

        if (!menuItems || menuItems.length < 1)
            return [];

        const parsedMenuItems: menuLinkProps[] = menuItems.map(item => {
            return {
                text: item.title.rendered,
                href: transformTitleUrl(item.title.rendered, "/")
            }
        });

        return parsedMenuItems;
    }

    // Query Search API using fetch <- cached with Next, used for search results
    searchBlogs = async (search: string): Promise<searchResults[]> => {

        if (search.length < 3)
            return [];

        const blogsMetaFetch: blogItem[] = await fetch(
            `${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/search?subtype="post"&search="${search}"`,
            {
                headers: wpPreviewHeaders,
                next: { revalidate: 0 }
            }
        ).then((res) => res.json())
            .catch(e => console.log('e: ', e));

        console.log("blogsMetaFetch: ", blogsMetaFetch);

        return [];
    }

    getCurrentMeta = async () => {

        const blogsMetaFetch: blogItem[] = await fetch(
            `${process.env.WP_PROTOCOL}://${process.env.WP_DOMAIN}/wp-json/wp/v2/post?_filter=""`,
            {
                headers: wpPreviewHeaders,
                next: { revalidate: 0 }
            }
        ).then((res) => res.json())
            .catch(e => console.log('e: ', e));

    }
}