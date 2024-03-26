import { v4 as uuid } from 'uuid';

class SessionManager {
    private static sessions = new Map<string, { userId: string, lastRefresh: number }>();

    public static createSession(userId: string): string {
        const sessionId = uuid();
        const now = Date.now();
        this.sessions.set(sessionId, { userId, lastRefresh: now });
        return sessionId;
    }

    public static refreshSession(sessionId: string): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.lastRefresh = Date.now();
            this.sessions.set(sessionId, session);
        }
    }

    public static getSessionId(userId: string): string | null {
        for (const [key, value] of this.sessions.entries()) {
            if (value.userId === userId) {
                return key;
            }
        }
        return null;
    }

    public static getSessionUserId(sessionId: string): string | null {
        const sessionInfo = this.sessions.get(sessionId);
        return sessionInfo ? sessionInfo.userId : null;
    }

    public static deleteUserSession(sessionId: string): void {
        this.sessions.delete(sessionId);
    }

    public static cleanupSessions(): void {
        const expiration = 36000000;
        const now = Date.now();
        this.sessions.forEach((value, key) => {
            if (now - value.lastRefresh > expiration) {
                this.sessions.delete(key);
            }
        });
    }
}


export default SessionManager;
