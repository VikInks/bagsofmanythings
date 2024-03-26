export function cookieManager(token: string | null, action: 'login' | 'logout'): string[] {
    if (action === 'login' && token) {
        const cookieValue = `jwt=${encodeURIComponent(token)}; 
        HttpOnly; 
        SameSite=Strict; 
        Path=/; 
        Max-Age=${36000}`; // 10 heures
        if (process.env.NODE_ENV === 'production') {
            return [`${cookieValue}; Secure`];
        }
        return [cookieValue];
    } else if (action === 'logout') {
        // Invalidation du cookie JWT en fixant Max-Age à 0
        return ['jwt=; HttpOnly; Path=/; Max-Age=0'];
    }
    return [];
}
