import { Account } from "./account";

/**
 * A mastodon status.
 */
export interface Status {
    id: string, 
    account: Account
    content: string,
    reblog?: Status, 
    
    replies_count: number, 
    reblogs_count: number, 
    favourites_count: number
    
    // TODO: Finish it.
}