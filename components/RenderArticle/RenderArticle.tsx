import { tipTapExtensions } from "./tipTapExtensions";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "novel";

export const RenderArticle = ({json}: {json: JSONContent}) => {
    const output = useMemo(() => {
        return generateHTML(json, tipTapExtensions)
    }, [json])

    return (
        <div className="prose m-auto w-11/12 sm:prose-lg md:prose-xl lg:prose-2xl dark:prose-invert prose-li:marker:text-primary" dangerouslySetInnerHTML={{ __html: output }} />
    )
}