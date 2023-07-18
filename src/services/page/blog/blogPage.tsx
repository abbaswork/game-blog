import { ListContainer } from '@/components/core/list-container/ListContainer';
import { Page, ParsedContent, ReplaceOptions } from '@/types';
import { WPTags } from '../../utils';
import PageService from '../parsePage';

const parseBlogBodyOptions: ReplaceOptions = {
    tags: [WPTags.Heading, WPTags.PageImage],
    htmlContent: true
}

const parseBlogHeaderOptions: ReplaceOptions = {
    tags: [WPTags.FeatureBlogImage],
    htmlContent: false
}

export default class BlogPageService extends PageService {

    //default blog params
    tableOfContents: React.JSX.Element;
    featuredImage: ParsedContent;


    //intialise & parse params
    constructor(post: Page, parseContentOptions = parseBlogBodyOptions) {
        super(post, parseContentOptions);
        this.featuredImage = this.parseContent(post.content.rendered, parseBlogHeaderOptions);
        this.tableOfContents = this.parseTOC(this.content);
    }

    /**
     * maps h2's to table of content
     */
    parseTOC = (content: ParsedContent): React.JSX.Element => {

        const tableOfContents: React.JSX.Element[] = [];

        //if empty contents are passed
        if (content === "" || (content as React.JSX.Element[]).length === 0)
            return <></>;

        //otherwise generate list items based on headers
        (content as React.JSX.Element[]).map((element: React.JSX.Element, index) => {
            if (element.type === 'h2') {
                tableOfContents.push(<li key={index}><a href={`#${element.props.id}`}>{element.props.children}</a></li>);
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