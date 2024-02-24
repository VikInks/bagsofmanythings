import {contextType} from "./context.type";

export function cookieManager (
    contextOrResponse: contextType | Response,
    token?: string,
    action?: string
): void {
    const response = (contextOrResponse as contextType).res || contextOrResponse as Response;

    // if the action is login and the user is already logged in, return
    if (action === 'login' && (contextOrResponse as contextType).user) return;

    // if the action is delete or logout, delete the cookie
    if (action === 'delete' || action === 'logout') {
        response.setHeader('Set-Cookie', 'jwt=; HttpOnly; Path=/; Max-Age=0');
        return;
    }
    let cookieValue: string;
    if (token) {
        cookieValue = `jwt=${encodeURIComponent(token)};`;
        cookieValue += ' HttpOnly; Path=/; Max-Age=3600';
    } else {
        cookieValue = 'HttpOnly; Path=/; Max-Age=0';
    }

    response.setHeader('Set-Cookie', cookieValue);
}
