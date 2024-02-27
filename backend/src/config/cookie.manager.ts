import {contextType} from "./context.type";

export async function cookieManager (
    token?: string,
    action?: string
): Promise<string | null> {
    if (action === 'login' && token) {
        // if the action is login and there is a token, create the cookie
        let cookieValue = `jwt=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=3600`;
        if (process.env.NODE_ENV === 'production') {
            cookieValue += '; Secure';
        }
        console.log(cookieValue);
        return cookieValue;
    }

    if (action === 'delete' || action === 'logout') {
        // if the action is delete or logout, create the cookie deletion string
        return 'jwt=; HttpOnly; Path=/; Max-Age=0';
    }

    return null;
}

