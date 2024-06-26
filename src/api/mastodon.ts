import { config } from '@/config/config';
import { store } from '@/store/store';
import { AppRegisterResponse } from "./responses/apps/app-register-response";
import {TokenResponse} from "./responses/oauth/token-response";
import { NodeInfoVersionSelector } from "./nodeinfo/nodeinfo-version-selector";
import {NodeInfo2} from "./nodeinfo/nodeinfo-2";

const redirectUri = `${window.location.protocol}//${window.location.host}/auth_callback`;

const defaultScopes = 'read write follow';

/**
 * The HTTP method to use.
 */
export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

/**
 * Gets the scopes for the app.
 */
export async function getScopes() {
    const nodeInfoVersionSelector = await call<NodeInfoVersionSelector>("/.well-known/nodeinfo");
    
    const versions = nodeInfoVersionSelector.links
        .filter(link => link.rel.startsWith("http://nodeinfo.diaspora.software/ns/schema/2."))
        .sort((a, b) => {
            const relA = a.rel.toUpperCase();
            const relB = b.rel.toUpperCase();
            
            if (relA < relB) {
                return 1;
            }
            
            if (relA > relB) {
                return -1;
            }
            
            return 0;
        });
    
    if (versions.length === 0) {
        return defaultScopes;
    }
    
    
    try {
        const nodeInfo = await call<NodeInfo2>(versions[0].href.replace(getDomain(), ""));
        if (nodeInfo.operations === null) {
            return defaultScopes;
        }

        let extraScopes = "";

        // Support for bites
        if (nodeInfo.operations["com.shinolabs.api.bite"].length !== 0) {
            extraScopes += " write:bites";
        }

        return `${defaultScopes}${extraScopes}`;
    } catch {
        return defaultScopes;
    }
}

/**
 * Gets the current domain
 */
export function getDomain() {
    return config.domain ?? localStorage.getItem("domain");
};

/**
 * Ensures that the domain is set.
 */
export async function ensureDomainIsSet() {
    if (config.domain === "" || config.domain === undefined &&
        (localStorage.getItem("domain") === null || localStorage.getItem("domain") === undefined)) {
        let domainValid = false;
        
        while (!domainValid) {
            const domain = prompt("Please enter a domain name (e.g. https://example.com)");
            localStorage.setItem("domain", domain);

            try {
                let _ = await call<{}>("/api/v1/instance");
                domainValid = true;
            } catch {

            }
        }
    }
}

/**
 * Calls a mastodon api.
 * @param url The url of the method.
 * @param params The parameters to pass.
 * @param methodOverride The method override.
 * @returns {Promise<TResponse>}
 */
export async function call<TResponse>(
    url: string,
    params: any = null,
    methodOverride?: Method): Promise<TResponse> {
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
        
        data = await fetch(`${getDomain()}${url}`, {
           method: methodOverride ?? "POST",
           body: body,
            
           headers: headers
        });
    } else {
        data = await fetch(`${getDomain()}${url}`, {
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
        scopes: await getScopes(),
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