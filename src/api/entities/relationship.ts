/**
 * A relationship information.
 */
export interface Relationship {
    id: string, 
    following: boolean, 
    followed_by: boolean, 
    requested: boolean, 
    requested_by: boolean
    
    // TODO: Finish the schema
}