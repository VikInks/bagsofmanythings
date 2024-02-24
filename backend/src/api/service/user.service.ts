import {IUser} from "../../model/user.schema";
import {findAllUsers, findUserByEmail, findUserById} from "../../dal/user.dal";

export class UserService {
    private userCache: Map<string, any> = new Map();

    async getUser(id: string): Promise<any> {
        if (this.userCache.has(id)) {
            return this.userCache.get(id)!;
        }
        const user = await findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        this.userCache.set(id, user.toJSON());
        return user!;
    }

    async getUserByEmail(email: string) {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUsers(): Promise<any[]> {
        if(this.userCache.size > 0) {
            return Array.from(this.userCache.values());
        }
        const users = await findAllUsers();
        users.forEach(user => {
            this.userCache.set(user?.id, user.toJSON());
        });
        return Array.from(this.userCache.values());
    }

    async addUser(user: IUser): Promise<void> {
        if (this.userCache.has(user.id as string)) {
            throw new Error('User id exist');
        }
        const permissiveUser: Partial<IUser> = {...user};
        delete permissiveUser.password;
        delete permissiveUser.role;
        delete permissiveUser.accountType;
        this.userCache.set(user.id as string, permissiveUser as IUser);
        console.log(this.userCache);
    }

    async removeUser(id: string): Promise<void> {
        if (!this.userCache.has(id)) {
            throw new Error('User not found');
        }
        this.userCache.delete(id);
    }

    async updateUser(user: IUser): Promise<void> {
        if (!this.userCache.has(user.id as string)) {
            throw new Error('User not found');
        }
        this.userCache.set(user.id as string, user as IUser);
    }
}
