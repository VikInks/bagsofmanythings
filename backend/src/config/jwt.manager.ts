import jwt from "jsonwebtoken";

export function jwtManager(userId: string, opt: string): string {
    return jwt.sign({id: userId}, process.env.SECRET_KEY ?? 'SECRET_KEY', {expiresIn: opt});
}
