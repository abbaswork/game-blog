import WordpressApi from '@/services/api/wordpress';
import { transformTitleUrl } from '../utils';
import { NavSearchType, blogItem, menuItem, menuLinkProps, searchResults, tagItem } from './types';

/**
 * This service handles navigation operations so that it can be used within any component
 * @description: It leverages WP Rest API & Next to handle caching of the requests
 * Functions can be run on the server side (cached) OR client side with little performance hit
 */
export default class NavigationService {

    API = new WordpressApi();

    /**
     * parse menu props from menu items
     * @param menuItems 
     * @returns 
     */
    getMenuItems = async (): Promise<menuLinkProps[]> => {

        //get menu items
        const menuItems = await this.API.getMenu();

        //check if valid
        if (!menuItems || menuItems.length < 1)
            return [];

        //parse menu items and generate slug
        const parsedMenuItems: menuLinkProps[] = menuItems.map(item => {
            return {
                text: item.title.rendered,
                href: transformTitleUrl(item.title.rendered, "/")
            }
        });

        return parsedMenuItems;
    }


    /**
     * Function that returns search results by searching titles and content
     * @param search 
     * @returns 
     */
    searchBlogs = (search: string): Promise<searchResults[]> | null => {

        //must have at least 3 letters typed out
        if (search.length < 2)
            return null;

        return this.API.searchPosts(search);

    }
}