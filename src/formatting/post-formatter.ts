import { Status } from "../api/entities/status";
import {EntityWithEmoji} from "../api/entities/abstract/entity-with-emoji";

/**
 * Formats a post.
 * @param status The status to format.
 */
export function formatPost(status: Status) : string {
    return replaceEmojisInText(status.content, status);
}

/**
 * Replaces all the emoji in a text.
 * @param text The text.
 * @param source The source object to use the emojis from.
 */
export function replaceEmojisInText(
    text: string, 
    source: EntityWithEmoji) : string {
    if (!source.emojis || source.emojis.length === 0) {
        return text;
    }

    let content = text;
    for (const emoji of source.emojis) {
        content = content.replaceAll(`:${emoji.shortcode}:`, `<img title="${emoji.shortcode}" class="w-5 inline hover:w-10 transition-all" src="${emoji.url}" alt="${emoji.shortcode}" />`);
    }

    return content;
}