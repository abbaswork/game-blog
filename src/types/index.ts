import { WPTags } from '@/constants/index';
import { DOMNode } from "html-react-parser";

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
  type: string,
  link: string,
  title: PostObj,
  content: PostObj,
  excerpt: PostObj,
  author: number,
  meta: any,
  tags: [],
  categories: string[] | number[],
  categoryForPage?: CategoryForPageType,
  _links: any
}

export type ParsedContent = string | JSX.Element | JSX.Element[];

export interface Meta {
  slug: string,
  title: string,
  date: string
}

export type ReplaceOptions = {
  tags: WPTags[],
  htmlContent: boolean
}

