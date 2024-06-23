/**
 * An RDF link.
 */
export interface RdfLink {
    rel: string,
    href: string
}

/**
 * The nodeinfo version selector.
 */
export interface NodeInfoVersionSelector {
    links: RdfLink[]
}