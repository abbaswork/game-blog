import { RatingIconsTypes } from "@/components/core/rating-icons/types";
import { ReplaceProps, ElementText, RatingListProps } from "@/constants/replacers";
import { Element } from "html-react-parser";
import { getStringProperties, stringTags } from "../utils";

export const replaceMeta = (text: string, token: string): ReplaceProps => {

    //check if child or child text is invalid
    if (!text || !token)
        return { valid: false };

    //extract text and replace any white spaces + caps
    text = text.replace(" ", "");
    text = (text as string).toLowerCase();

    const field = text.split(`/${token}:`);
    console.log("field: ", field[1]);

    return { valid: true, compProps: field[1] || "" };

}