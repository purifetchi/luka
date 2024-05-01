import { Status } from "../api/entities/status";

/**
 * Formats a post.
 * @param status The status to format.
 */
export function formatPost(status: Status) : string {
    if (!status.emojis || status.emojis.length === 0) {
        return status.content;
    }
    
    // Replace all the emoji in the post.
    let content = status.content;
    for (const emoji of status.emojis) {
        content = content.replace(`:${emoji.shortcode}:`, `<img title="${emoji.shortcode}" class="w-5 inline hover:w-10 transition-all" src="${emoji.url}" alt="${emoji.shortcode}" />`);
    }
    
    return content;
}