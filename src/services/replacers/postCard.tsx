import { BlogCardProps } from "@/components/core/blog-card/BlogCard";
import { ReplaceProps, ElementText } from "@/constants/replacers";
import { Element } from "html-react-parser";
import { transformTitleUrl } from "../utils";

//replace any absolute urls from wp, into relative urls for next
const buildRelativeURL = (src: string): string => {
    const tokens = src.split(".com");
    return (tokens ? tokens[1] : "");
}



export const replacePostCard = (domNode: Element): ReplaceProps => {

    //check for mandatory fields in order to make a post card
    if (!(domNode.name === "li") || !(domNode.type === "tag"))
        return { valid: false };

    //setup props
    var props: BlogCardProps = {
        src: "",
        title: "",
        alt: "",
        href: ""
    }

    //run through list of components and extract required fields
    //create recursive function that goes through each route and flags required fields
    const recursiveFunction = (child: Element) => {

        if (child.type === "tag" && child.name === "img") {
            props.src = child.attribs.src || "";
            props.alt = child.attribs.alt || "";
        }

        // if (child.name === "a")
        //props.href = buildRelativeURL(child.attribs.href) || "";

        if (!child.name && child.parent && (child.parent as Element).name === "p")
            props.description = (child as ElementText).data || "";

        if (!child.name && child.parent && (child.parent as Element).name === "a") {
            props.title = (child as ElementText).data || "";
            props.href = transformTitleUrl(props.title);
        }

        child.children && (child.children as Element[]).forEach(recursiveFunction);
    }

    (domNode.children as Element[]).forEach(recursiveFunction);

    //check if all the required props are there for the blog card
    if (!props.src || !props.alt || !props.title || !props.href)
        return { valid: false };


    return { valid: true, compProps: props };
}