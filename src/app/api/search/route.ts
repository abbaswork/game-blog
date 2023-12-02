import NavigationService from '@/services/navigation/navigation';
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Endoint which takes search term and looks for matching content through WP Rest API
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest) {

    //extract search terms
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');

    if (!query) //return empty search results, if query not valid
        return NextResponse.json([])

    //set up navigation service and query search term
    const navigationService = new NavigationService();
    const searchResults = await navigationService.searchBlogs(query);


    //if search term is valid, use WP api to get related blogs, otherwise return empty results
    return NextResponse.json(searchResults);
}