import { Page } from ".";
import { Element } from 'html-react-parser';

export const mockEmptyElement: Element = {
    name: '', //key property, usually class name
    attribs: {},
    type: "div" as any,
    nodeType: 1,
    tagName: '', //key property
    attributes: [], //key property - usally classname
    children: [], //key property
    firstChild: null,
    lastChild: null,
    childNodes: [],
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    parentNode: null,
    previousSibling: null,
    nextSibling: null,
    cloneNode: undefined as any
};

export const mockOnlyText = {
    ...mockEmptyElement,
    name: null,
    parent: { ...mockEmptyElement, name: "li", type: "tag" },
    data: "testing"
}

export const mockHeaderTag: Element = {
    ...mockEmptyElement, name: "h2", type: "tag",
    children: [
        Text as any, {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            data: 'Marvel Ultimate Alliance',
            type: 'text'
        }
    ]
} as Element;

export const mockImgTag: Element = {
    ...mockEmptyElement,
    name: "figure",
    type: "tag",
    children: [
        Text as any, {
            name: "a",
            type: "tag",
            children: [

            ]
        }
    ]
} as Element;

export const mockTitleWithRating: Element = {
    parent: null,
    children: [
        Text as any, {
            parent: null,
            prev: null,
            next: null,
            startIndex: null,
            endIndex: null,
            data: 'Marvel Ultimate Alliance 5',
            type: 'text'
        }
    ],
    name: 'h2',
    attribs: { class: 'wp-block-heading title-with-rating' },
    type: 'tag' as any,
    nodeType: 1,
    tagName: "",
    attributes: [],
    firstChild: null,
    lastChild: null,
    childNodes: [],
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    parentNode: null,
    previousSibling: null,
    nextSibling: null,
    cloneNode: undefined as any
}


export const testPost: Page =
{
    "id": 23,
    "date": "2023-07-13T08:51:34",
    "modified": "2023-07-13T10:45:16",
    "slug": "hello-world-2",
    "status": "publish",
    "type": "post",
    "link": "http://gameblog.local/hello-world-2/",
    "title": {
        "rendered": "Hello World 2"
    },
    "content": {
        "rendered": "\n<h2 class=\"wp-block-heading\">Introduction</h2>\n\n\n\n<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#8217;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n",
        "protected": false
    },
    "excerpt": {
        "rendered": "<p>Introduction Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#8217;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into [&hellip;]</p>\n",
        "protected": false
    },
    "author": 1,
    "meta": [],
    "categories": [
        1
    ],
    "tags": [],
    "_links": {
        "self": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/posts/23"
            }
        ],
        "collection": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/posts"
            }
        ],
        "about": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/types/post"
            }
        ],
        "author": [
            {
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/users/1"
            }
        ],
        "replies": [
            {
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/comments?post=23"
            }
        ],
        "version-history": [
            {
                "count": 3,
                "href": "http://gameblog.local/wp-json/wp/v2/posts/23/revisions"
            }
        ],
        "predecessor-version": [
            {
                "id": 27,
                "href": "http://gameblog.local/wp-json/wp/v2/posts/23/revisions/27"
            }
        ],
        "wp:attachment": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/media?parent=23"
            }
        ],
        "wp:term": [
            {
                "taxonomy": "category",
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/categories?post=23"
            },
            {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/tags?post=23"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
}

export const renderedHeadings = [
    <h2 key="1" className="wp-block-heading">Test 1</h2>,
    <h2 key="2" className="wp-block-heading">Test 2</h2>,
    <h2 key="3" className="wp-block-heading">Test 3</h2>,
]

export const emptyPost: Page = {
    "id": 1,
    "date": "",
    "modified": "",
    "slug": "",
    "status": "",
    "type": "",
    "link": "",
    "title": {
        "rendered": ""
    },
    "content": {
        "rendered": "",
        "protected": false
    },
    "excerpt": {
        "rendered": "<p>Introduction Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#8217;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into [&hellip;]</p>\n",
        "protected": false
    },
    "author": 1,
    "meta": [],
    "categories": [
        1
    ],
    "tags": [],
    "_links": {
        "self": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/posts/1"
            }
        ],
        "collection": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/posts"
            }
        ],
        "about": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/types/post"
            }
        ],
        "author": [
            {
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/users/1"
            }
        ],
        "replies": [
            {
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/comments?post=1"
            }
        ],
        "version-history": [
            {
                "count": 9,
                "href": "http://gameblog.local/wp-json/wp/v2/posts/1/revisions"
            }
        ],
        "predecessor-version": [
            {
                "id": 25,
                "href": "http://gameblog.local/wp-json/wp/v2/posts/1/revisions/25"
            }
        ],
        "wp:attachment": [
            {
                "href": "http://gameblog.local/wp-json/wp/v2/media?parent=1"
            }
        ],
        "wp:term": [
            {
                "taxonomy": "category",
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/categories?post=1"
            },
            {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "http://gameblog.local/wp-json/wp/v2/tags?post=1"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
}