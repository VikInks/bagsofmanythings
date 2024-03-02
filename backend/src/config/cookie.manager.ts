export async function cookieManager(
    token?: string | null,
    action?: string
): Promise<string | null> {
    if (action === 'login' && typeof token === 'string') {
        let cookieValue = `jwt=${encodeURIComponent(token)}; HttpOnly; sameSite=Strict; Path=/; Max-Age=36000`;
        if (process.env.NODE_ENV === 'production') {
            cookieValue += '; Secure';
        }
        return cookieValue;
    }

    if (action === 'delete' || action === 'logout') {
        return 'jwt=; HttpOnly; Path=/; Max-Age=0';
    }

    return null;
}
