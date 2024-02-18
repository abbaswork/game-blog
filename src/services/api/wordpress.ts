import { Page } from "@/types";
import { menuItem, searchResults } from "../navigation/types";

//setup menu types
type menuLocationMap = {
    [key in menuLocations]: {
        menu: number,
        name: menuLocations
    }
};

//setup menu locations
enum menuLocations {
    header = "header",
    sidebar = "sidebar"
}

//setup WP headers
const wpPreviewHeaders = new Headers();
wpPreviewHeaders.set('Authorization', 'Basic ' + btoa(process.env.WP_USERNAME + ":" + process.env.WP_PASSWORD));

export { wpPreviewHeaders, menuLocations };

/**
 * This API configures fetch to make authenticated calls to WP
 * Additionaly it handles caching, error handling and more
 */
export default class WordpressApi {

    //setup headers used on every req
    wpPreviewHeaders = wpPreviewHeaders;

    query = async (url: string, options?: { revalidate: number }): Promise<any> => {

        try {// catch any errors while querying rest api
            const next = options || undefined;
            const res = await fetch(
                `http://${process.env.NEXT_PUBLIC_WP_DOMAIN}/wp-json/wp/v2/${url}`,
                {
                    headers: wpPreviewHeaders,
                    next
                }
            );

            //convert to json and check for valid resp
            const json = await res.json();
            if (json?.code) {
                console.log("Server Error: ", [{
                    url: url,
                    json: json
                }]);
                return null;
            } else {
                // return (Array.isArray(json) ? json : [json]);
                return json;
            }

        } catch (e) {
            console.log("error querying WP Rest API: ", e);
        }
    }

    /**
     * Returns collection of menu items
     * @returns 
     */
    getMenuLocations = (): Promise<menuLocationMap> => {
        return this.query(`menu-locations`)
    }

    /**
     * get list of menu items
     * @returns 
     */
    getMenu = (id: number): Promise<menuItem[]> => {
        return this.query(`menu-items?menus=${id}`)
    }

    /**
     * endpoint that searches term inside blogs and returns matching
     * @param search 
     */
    searchPosts = (search?: string): Promise<searchResults[]> => {
        return this.query(`search?subtype="post"&search="${search}"`);
    }

    /**
     * get blogs including content, supports many options
     * @param param0 
     * @returns 
     */
    getBlogs = ({ tags, categories, search, pages, filter, exclude }: { tags?: number[], categories?: number[], search?: string, pages?: number, filter?: string, exclude?: number[] }): Promise<Page[]> => {
        return this.query(`posts/`
            + (pages ? `?per_page=${pages}` : "?per_page=100")
            + (tags ? `&tags=${tags}` : "")
            + (categories ? `&categories=${categories}` : "")
            + (search ? `&search=${search}` : "")
            + (exclude ? `&exclude=${exclude}` : "")
            + (filter ? `&_filter=${filter}` : "")
        )
    }

}