import WordpressApi, { menuLocations } from '@/services/api/wordpress';
import { transformTitleUrl } from '../utils';
import { menuLinkProps, searchResults } from './types';

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
    getMenuItems = async (location = menuLocations.header): Promise<menuLinkProps[]> => {

        //get list of menu locations
        const list = await this.API.getMenuLocations();

        //if no locations defined, return []
        if (!list)
            return [];

        //match menu and get items
        const locationOfMenu = list[location];
        const menuItems = await this.API.getMenu(locationOfMenu.menu || 0);

        //check if valid
        if (!menuItems || menuItems.length < 1)
            return [];

        //parse menu items and generate slug
        const parsedMenuItems: menuLinkProps[] = menuItems.map(item => {
            return {
                text: item.title.rendered,
                href: (item.url && item.url.includes("draft") ? transformTitleUrl(item.title.rendered, "/") : item.url || "")
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
        return this.API.searchPosts(search);
    }
}