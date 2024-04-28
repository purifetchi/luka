/**
 * A mastodon account.
 */
export interface Account {
    id: string, 
    username: string,
    acct: string, 
    display_name: string,
    note: string,
    avatar: string
    
    // TODO: Finish it
}