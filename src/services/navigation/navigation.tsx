import { transformTitleUrl } from '../utils';
import { menuItem, menuLinkProps } from './types';

export default class NavigationService {

    //default page params
    menuLinks: menuLinkProps[];


    /**
     * Initialise and parse default params
     * @param post 
     * @param parseContentOptions - useful for specific pages and classes that extend page
     */
    constructor(menuItems: menuItem[]) {
        this.menuLinks = this.parseLinks(menuItems);
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
}