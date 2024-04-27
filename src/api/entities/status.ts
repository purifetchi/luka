import { Account } from "./account";

/**
 * A mastodon status.
 */
export interface Status {
    id: string, 
    account: Account
    content: string,
    reblog?: Status, 
    
    // TODO: Finish it.
}