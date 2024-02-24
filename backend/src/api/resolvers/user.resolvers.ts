import {createUser, deleteUser, findAllUsers, findUserById, isAdmin, updateUser} from "../../dal/user.dal";
import {contextType} from "../../config/context.type";
import {respondWithStatus} from "../utils/response.status";
import {UserService} from "../service/user.service";
import {validateAndResponse} from "../utils/validate.response";
import {IUser} from "../../model/user.schema";
import {updateUserSchema} from "./validation/user.val";

const userService = new UserService();

export const userResolvers = {
    Query: {
        users: async (_: any, __:any, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                if(!await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                const users = await findAllUsers();
                return respondWithStatus(200, "OK", true, users, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        },
        user: async (_: any, args: {id: string}, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                if(!await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                const user = await findUserById(args.id);
                return respondWithStatus(200, "OK", true, user, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        },
        getUsernames: async (_: any, args: {partial: string}, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                const users  = await userService.getUsers();
                const usernames = users.map(user => user.username);
                const partial = args.partial.toLowerCase();
                const result = usernames.filter(username => username.toLowerCase().includes(partial));
                return respondWithStatus(200, "OK", true, result, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        }
    },
    Mutation: {
        updateUser: async (_: any, args: { user: IUser }, context: contextType) => {
            await validateAndResponse(updateUserSchema, args, 'update user', context, async () => {
                try {
                    if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                    if (context.user !== args.user?.id) return respondWithStatus(403, "Forbidden", false, null, context);
                    if (args.user.role && args.user.role === 'admin' && !await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                    const user = await updateUser(args.user.id, args.user);
                    if(!user) return respondWithStatus(404, "Not Found", false, null, context);
                    await userService.updateUser(user.toJSON());
                    return respondWithStatus(200, "OK", true, user, context);
                } catch (e: any) {
                    return respondWithStatus(500, "Internal Server Error", false, null, context);
                }
            });
        },
        deleteUser: async (_: any, args: {id: string}, context: contextType) => {
            await validateAndResponse(null, args.id, 'delete user', context, async () => {
                try {
                    if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                    if (context.user !== args.id) return respondWithStatus(403, "Forbidden", false, null, context);
                    await deleteUser(args.id);
                    await userService.removeUser(args.id);
                    return respondWithStatus(200, "OK", true, null, context);
                } catch (e: any) {
                    return respondWithStatus(500, "Internal Server Error", false, null, context);
                }
            });
        },
    },
}
