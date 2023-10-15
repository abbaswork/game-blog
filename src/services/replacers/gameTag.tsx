import { ReplaceProps, GameTagProps, ElementText } from "@/constants/replacers";
import { Element } from "html-react-parser";

export const replaceGameTags = (domNode: Element): ReplaceProps => {

    var listItems: GameTagProps[] = [];
    var indexCounter = 0;

    if (!domNode.children || domNode.children.length < 1)
        return { valid: false };

    //recursive function that maps all text properties into gametag list items
    const recursiveFunction = (child: Element) => {

        if (!child.name && child.parent) {
            listItems.push({ index: indexCounter, text: (child as ElementText).data || "" });
            indexCounter++;
        }

        child.children && (child.children as Element[]).forEach(recursiveFunction);
    }

    (domNode.children as Element[]).forEach(recursiveFunction);

    return { valid: true, compProps: listItems };

}