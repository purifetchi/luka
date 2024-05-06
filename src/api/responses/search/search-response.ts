import {Status} from "../../entities/status";
import {Account} from "../../entities/account";

/**
 * The response given back to us by the search.
 */
export interface SearchResponse {
    statuses: Status[],
    accounts: Account[]
    
    // TODO: Hashtags
}