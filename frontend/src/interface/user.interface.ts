export interface IUser {
    _id: string;
    username: string;
    email: string;
    bio: string;
    avatar: string;
    preferences: {
        language: string;
        theme: string;
        notifications: boolean;
    };
}
