import { Status } from "../../entities/status";

/**
 * The statuses above and below a given status.
 */
export interface StatusContextResponse {
    /**
     * The ancestors of this post.
     */
    ancestors: Status[],

    /**
     * The descendants of this post.
     */
    descendants: Status[]
}