import jwt from "jsonwebtoken";

export function jwtRefreshManager(userId: string, opt: string = '7d'): string {
    return jwt.sign(
        {id: userId},
        process.env.REFRESH_SECRET_KEY ?? 'REFRESH_SECRET_KEY',
        {expiresIn: opt}
    );
}
