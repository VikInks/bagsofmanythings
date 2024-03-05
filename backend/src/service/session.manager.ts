import { v4 as uuid } from 'uuid';

class SessionManager {
    private static sessions = new Map<string, string>();

    public static createSession(userId: string): string {
        const sessionId = uuid();
        this.sessions.set(sessionId, userId);
        return sessionId;
    }

    public static getSessionUserId(sessionId: string): string | null {
        if (this.sessions.has(sessionId)) {
            return this.sessions.get(sessionId)!;
        }
        return null;
    }

    public static deleteSession(sessionId: string): void {
        this.sessions.delete(sessionId);
    }
}

export default SessionManager;
