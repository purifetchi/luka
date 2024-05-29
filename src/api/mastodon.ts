import { config } from '@/config/config';
import { store } from '@/store/store';
import { AppRegisterResponse } from "./responses/apps/app-register-response";
import {TokenResponse} from "./responses/oauth/token-response";

const redirectUri = `${window.location.protocol}//${window.location.host}/auth_callback`;
export const scopes = 'read write follow write:bites';

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
        let body;
        if (params instanceof FormData) {
            body = params;
        }
        else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(params);
        }
        
        data = await fetch(`${config.domain}${url}`, {
           method: 'POST',
           body: body,
            
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
        scopes: scopes,
        redirect_uris: redirectUri
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
        redirect_uri: redirectUri,

        username: username,
        password: password
    });
    
    if (resp.access_token === undefined) {
        throw new Error("Unable to login");
    } 

    store.client_token = resp.access_token;
    localStorage.setItem("client_token", resp.access_token);
}

/**
 * Logs in from the OAuth flow.
 * @param code The retrievec code.
 */
export async function loginFromOAuthFlow(code: string) {
    const resp = await call<TokenResponse>("/oauth/token", {
        grant_type: "authorization_code",
        
        client_id: store.client_id,
        client_secret: store.client_secret,
        redirect_uri: redirectUri,

        code: code
    });

    if (resp.access_token === undefined) {
        throw new Error("Unable to login");
    }

    store.client_token = resp.access_token;
    localStorage.setItem("client_token", resp.access_token);
}

/**
 * Logs out the current client.
 */
export async function logout() {
    const resp = await call<{}>("/oauth/revoke", {
        client_id: store.client_id,
        client_secret: store.client_secret,
        token: store.client_token
    });
    
    store.client_token = null;
    localStorage.removeItem("client_token");
}