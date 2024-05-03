import { Status } from "./status";
import { Account } from "./account";

/**
 * The type of the notification,
 */
export enum NotificationType {
    /**
     * Someone mentioned you in their status.
     */
    Mention = "mention",

    /**
     * Someone you enabled notifications for has posted a status.
     */
    NewStatus = "status",

    /**
     * Someone boosted one of your statuses.
     */
    Reblog = "reblog",

    /**
     * Someone followed you.
     */
    Follow = "follow",

    /**
     * Someone requested to follow you.
     */
    FollowRequest = "follow_request",

    /**
     * Someone favourited one of your statuses.
     */
    Favourite = "favourite",

    /**
     * A poll you have voted in or created has ended.
     */
    Poll = "poll",

    /**
     * A status you interacted with has been edited.
     */
    Update = "update",
    
    // TODO: Finish the enum
}

/**
 * 
 */
export interface Notification {
    /**
     * The id of the notification in the database.
     */
    id: string,

    /**
     * The type of event that resulted in the notification.
     */
    type: NotificationType,

    /**
     * The timestamp of the notification.
     */
    created_at: string,

    /**
     * The account that performed the action that generated the notification.
     */
    account: Account,

    /**
     * Status that was the object of the notification.
     */
    status?: Status,
    
    // TODO: report, relationship_severance_event
}