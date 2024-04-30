/**
 * The type of the attachment.
 */
export enum AttachmentType {
    Image = 'image',
    Video = 'video',
    Audio = 'audio',
    GifV = 'gifv',
    Unknown = 'unknown'
}

/**
 * A media attachment.
 */
export interface MediaAttachment {
    id: string,
    type: AttachmentType,
    url: string
    // TODO: Finish the implementation
}