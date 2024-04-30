import { Account } from "./account";
import {MediaAttachment} from "./media-attachment";

/**
 * A mastodon status.
 */
export interface Status {
    id: string, 
    account: Account
    content: string,
    reblog?: Status,
    
    media_attachments: MediaAttachment[],
    
    replies_count: number, 
    reblogs_count: number, 
    favourites_count: number
    
    // TODO: Finish it.
}