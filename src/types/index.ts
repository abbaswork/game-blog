//default Post obj from wp rest api
type PostObj = {
  rendered: string,
  protected?: boolean
}

export interface Post {
    id: number,
    date: string,
    date_gmt: string,
    guid: PostObj,
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    type: string,
    link: string,
    title: PostObj,
    content: PostObj,
    excerpt: PostObj,
    author: number,
    featured_media: number,
    comment_status: string,
    ping_status: string,
    sticky: boolean,
    template: string,
    format: string,
    meta: any,
    tags: [],
    categories: string[] | number[],
    _links: any
  }

  export type ParsedContent = string | JSX.Element | JSX.Element[];

  export interface BlogMeta {
    slug: string,
    title: string,
    date: string
  }
