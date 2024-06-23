/**
 * The operations supported by this instance
 */
export interface Operations {
    [key: string]: string[]
}

/**
 * The NodeInfo 2.0 interface.
 */
export interface NodeInfo2 {
    operations?: Operations
    // TODO: The rest of the node info
}