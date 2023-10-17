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

export type menuLinkProps = { text: string, href: string };