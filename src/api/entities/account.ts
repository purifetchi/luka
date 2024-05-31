import { EntityWithEmoji } from "./abstract/entity-with-emoji";

/**
 * A mastodon account.
 */
export interface Account extends EntityWithEmoji {
    id: string, 
    username: string,
    acct: string, 
    display_name: string,
    note: string,
    avatar: string,
    header: string,
    
    statuses_count : number,
    followers_count: number,
    following_count: number
    
    // TODO: Finish it
}