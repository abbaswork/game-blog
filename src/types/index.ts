import { PageTypes, WPTags } from '@/constants/index';

//default Post obj from wp rest api
type PostObj = {
  rendered: string,
  protected?: boolean
}

export interface CategoryForPageType {
  id: number,
  count: number,
  description: string,
  link: string,
  name: string,
  slug: string
}

export interface Page {
  id: number,
  date: string,
  modified: string,
  slug: string,
  status: string,
  type: PageTypes,
  link: string,
  title: PostObj,
  content: PostObj,
  excerpt: PostObj,
  author: number,
  meta: any,
  tags: [],
  categories: number[],
  categoryForPage?: CategoryForPageType,
  _links: any
}

export type ParsedContent = string | JSX.Element | JSX.Element[];

export interface Meta {
  id: number,
  slug: string,
  title: string,
  date: string,
  type: PageTypes,
  tags?: number[],
  categories?: number[],
}

export type ReplaceOptions = {
  tags: WPTags[],
  htmlContent: boolean
}

