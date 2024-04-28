import { config } from '@/config/config';
import { store } from '@/store/store';
import { AppRegisterResponse } from "./responses/apps/app-register-response";
import {TokenResponse} from "./responses/oauth/token-response";

/**
 * Calls a mastodon api.
 * @param url The url of the method.
 * @param params The parameters to pass.
 * @returns {Promise<TResponse>}
 */
export async function call<TResponse>(
    url: string,
    params: any = null): Promise<TResponse> {
    let data: Response;
    
    let headers: any = {};
    if (store.client_token !== null) {
        headers['Authorization'] = `Bearer ${store.client_token}`;
    }
    
    if (params !== null) {
        headers['Content-Type'] = 'application/json';
        
        data = await fetch(`${config.domain}${url}`, {
           method: 'POST',
           body: JSON.stringify(params),
            
           headers: headers
        });
    } else {
        data = await fetch(`${config.domain}${url}`, {
            headers: headers
        });
    }
    
    return await data.json() as TResponse;
}

/**
 * Registers this application on the remote server.
 */
export async function registerApp() {
    const resp = await call<AppRegisterResponse>("/api/v1/apps", {
        client_name: config.app_name,
        redirect_uris: "urn:ietf:wg:oauth:2.0:oob" // TODO: Placeholder.
    });

    localStorage.setItem("client_id", resp.client_id);
    localStorage.setItem("client_secret", resp.client_secret);

    store.client_id = resp.client_id;
    store.client_secret = resp.client_secret;
}

/**
 * Logs into a mastodon instance.
 * @param username The username of the user.
 * @param password The password.
 */
export async function login(
    username: string, 
    password: string) {
    const resp = await call<TokenResponse>("/oauth/token", {
        grant_type: "password",
        client_id: store.client_id,
        client_secret: store.client_secret,
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob", // TODO: This is only a placeholder.

        username: username,
        password: password
    });
    
    if (resp.access_token === undefined) {
        throw new Error("Unable to login");
    } 

    store.client_token = resp.access_token;
    localStorage.setItem("client_token", resp.access_token);
}