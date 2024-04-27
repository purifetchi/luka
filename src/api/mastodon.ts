import { config } from '@/config/config';

/**
 * Calls a mastodon api.
 * @param url The url of the method.
 * @returns {Promise<TResponse>}
 */
export async function call<TResponse>(url: string): Promise<TResponse> {
    const data = await fetch(`${config.domain}${url}`);
    return await data.json() as TResponse;
}
