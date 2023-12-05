import { BlogCardProps } from "@/components/core/blog-card/BlogCard";
import { RatingIconsTypes } from "@/components/core/rating-icons/types";
import { Element } from "html-react-parser";

export type ElementText = Element & {
    data: string;
}

export type ImgProps = {
    src: string,
    alt?: string
}

export type GameTagProps = {
    index: number;
    text: string; 
}

export type RatingListProps = {
    index: number;
    icon: RatingIconsTypes,
    rating: number,
    text: string
}

export type TitleWithRatingProps = {
    text: string
    rank: number
}

//Interface for return for Replace Components
export type ReplaceProps = {
    valid: boolean,
    compProps?: undefined | string | BlogCardProps | ImgProps | TitleWithRatingProps | GameTagProps[] | RatingListProps[],
    id?: string
};