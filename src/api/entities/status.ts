import { Account } from "./account";
import { MediaAttachment } from "./media-attachment";
import { CustomEmoji } from "./custom-emoji";

/**
 * Visibility of a status.
 */
export enum Visibility {
    /**
     * Visible to everyone, shown in public timelines.
     */
    Public = 'public',

    /**
     * Visible to public, but not included in public timelines.
     */
    Unlisted = 'unlisted',

    /**
     * Visible to followers only, and to any mentioned users.
     */
    Followers = 'private',

    /**
     * Visible only to mentioned users.
     */
    Direct = 'direct'
}

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
    visibility: Visibility,
    
    media_attachments: MediaAttachment[],
    emojis: CustomEmoji[],
    
    replies_count: number, 
    reblogs_count: number, 
    favourites_count: number,
    
    favourited?: boolean, 
    reblogged?: boolean,
    bookmarked?: boolean,
    
    in_reply_to_id?: string
    
    // TODO: Finish it.
}