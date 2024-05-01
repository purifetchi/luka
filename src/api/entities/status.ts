import { Account } from "./account";
import { MediaAttachment } from "./media-attachment";
import { CustomEmoji } from "./custom-emoji";

/**
 * A mastodon status.
 */
export interface Status {
    id: string,
    uri: string,
    url?: string, 
    account: Account
    content: string,
    reblog?: Status,
    sensitive: boolean, 
    
    media_attachments: MediaAttachment[],
    emojis: CustomEmoji[],
    
    replies_count: number, 
    reblogs_count: number, 
    favourites_count: number,
    
    favourited?: boolean, 
    reblogged?: boolean,
    bookmarked?: boolean
    
    // TODO: Finish it.
}