import cron from 'node-cron';
import SessionManager from "../../service/session.manager";

// Clean sessions every day at midnight
export const planner = () => {
    cron.schedule('0 0 * * *', () => {
        SessionManager.cleanupSessions();
    });
}
