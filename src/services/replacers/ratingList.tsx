import { RatingIconsTypes } from "@/components/core/rating-icons/types";
import { ReplaceProps, ElementText, RatingListProps } from "@/constants/replacers";
import { Element } from "html-react-parser";
import { getStringProperties, stringTags } from "../utils";

export const replaceRatingList = (domNode: Element): ReplaceProps => {

    var listItems: RatingListProps[] = [];
    var indexCounter = 0;

    if (!domNode.children || domNode.children.length < 1)
        return { valid: false };

    //recursive function that maps all text properties into gametag list items
    const recursiveFunction = (child: Element) => {

        if (!child.name && child.parent) {
            //extract properties from string, for icon and rating
            const properties = {...getStringProperties((child as ElementText).data, [stringTags.ICON, stringTags.RATING])};

            //set default values for component
            listItems.push({ index: indexCounter, text: properties.originalText, icon: properties.icon || RatingIconsTypes.swords, rating: Number(properties.rating) || 0});
            indexCounter++;
        }

        child.children && (child.children as Element[]).forEach(recursiveFunction);
    }

    (domNode.children as Element[]).forEach(recursiveFunction);

    return { valid: true, compProps: listItems };

}