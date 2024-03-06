export async function cookieManager(
    tokens?: {[key: string]: string} | null,
    action?: string
): Promise<string[] | null> {
    if (action === 'login' && tokens) {
        let cookies = [];
        for(let tokenName in tokens){
            let cookieValue = `${tokenName}=${encodeURIComponent(tokens[tokenName])}; 
            HttpOnly; 
            sameSite=Strict; 
            Path=/; 
            Max-Age=${tokenName === 'access_token' ? 36000 : 604800}`; // time = 10h and 7d
            if (process.env.NODE_ENV === 'production') {
                cookieValue += '; Secure';
            }
            cookies.push(cookieValue);
        }
        return cookies;
    }

    if (action === 'delete' || action === 'logout') {
        return ['access_token=; HttpOnly; Path=/; Max-Age=0', 'refresh_token=; HttpOnly; Path=/; Max-Age=0'];
    }

    return null;
}
