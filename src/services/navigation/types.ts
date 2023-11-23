export type menuItem = {
  id: number,
  title: { rendered: string }
  status?: string,
  url?: string,
  attr_title?: string,
  description?: string,
  type?: string,
  type_label?: string,
  object?: string,
  object_id?: number,
  parent?: number,
  menu_order?: number,
  target?: string,
  classes?: string[],
  xfn?: string[],
  invalid?: boolean,
  meta?: string[],
  menus?: number,
  _links: any
}

export type tagItem = {
  id: number,
  name: string,
  description?: string
}

export type searchResults = {
  id: number,
  title: string,
  url: string,
  type: string,
  subtype: "post" | "page" | "category" | "post_tag"
}

export enum NavSearchType{
  tags = "TAG",
  url = "URL",
  category = "CATEGORY"
}

export type blogItem = {
  generated_slug: string,
  meta: Object,
  tags: Object[],
  categories: Object[]
}

export type menuLinkProps = { text: string, href: string };