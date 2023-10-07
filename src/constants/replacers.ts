import { BlogCardProps } from "@/components/core/blog-card/BlogCard";

//Interface for return for Replace Components
export type ReplaceProps = {
    valid: boolean,
    compProps?: undefined | BlogCardProps,
    children?: JSX.Element
    id?: string
};