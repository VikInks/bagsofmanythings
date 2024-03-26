import {deleteUser, findAllUsers, findUserById, isAdmin, updateUser} from "../../data_access/user.dal";
import {contextType} from "../../config/context.type";
import {respondWithStatus} from "../utils/response.status";
import {validateAndResponse} from "../utils/validate.response";
import {IUser} from "../../model/user.schema";
import {idSchema, updateUserSchema} from "./validation/user.val";

export const userResolvers = {
    Query: {
        // Get all users (only for admin)
        users: async (_: any, __: any, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                if (!await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                const users = await findAllUsers();
                return respondWithStatus(200, "OK", true, users, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        },
        // Get user by id (only for admin)
        user: async (_: any, args: { id: string }, context: contextType) => {
            await validateAndResponse(idSchema, args.id, 'get user', context, async () => {
                try {
                    if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                    if (!await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                    const user = await findUserById(args.id);
                    return respondWithStatus(200, "OK", true, user, context);
                } catch (e) {
                    return respondWithStatus(500, "Internal Server Error", false, null, context);
                }
            });
        },
        // Get usernames by partial username
        getUsernames: async (_: any, args: { partial: string }, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                const users = await findAllUsers();
                const usernames = users.map(user => user.username);
                const partial = args.partial.toLowerCase();
                const result = usernames.filter(username => username.toLowerCase().includes(partial));
                return respondWithStatus(200, "OK", true, result, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        },
        // Get owned user profile (only for owner user)
        getProfile: async (_: any, __: any, context: contextType) => {
            try {
                if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                const user = await findUserById(context.user);
                return respondWithStatus(200, "OK", true, user, context);
            } catch (e) {
                return respondWithStatus(500, "Internal Server Error", false, null, context);
            }
        },
    },
    Mutation: {
        // Update user profile (only for owner user or admin to update role)
        updateUser: async (_: any, args: { user: IUser }, context: contextType) => {
            await validateAndResponse(updateUserSchema, args, 'update user', context, async () => {
                try {
                    if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                    if (context.user !== args.user?.id) return respondWithStatus(403, "Forbidden", false, null, context);
                    if (args.user.role && args.user.role === 'admin' && !await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                    const user = await updateUser(args.user.id, args.user);
                    if (!user) return respondWithStatus(404, "Not Found", false, null, context);
                    return respondWithStatus(200, "OK", true, user, context);
                } catch (e: any) {
                    return respondWithStatus(500, "Internal Server Error", false, null, context);
                }
            });
        },
        // Delete user (only for owner user or admin to delete user)
        deleteUser: async (_: any, args: { id: string }, context: contextType) => {
            await validateAndResponse(idSchema, args.id, 'delete user', context, async () => {
                try {
                    if (!context.user) return respondWithStatus(401, "Unauthorized", false, null, context);
                    if (context.user !== args.id && !await isAdmin(context.user)) return respondWithStatus(403, "Forbidden", false, null, context);
                    const user = await deleteUser(args.id);
                    if (!user) return respondWithStatus(404, "Not Found", false, null, context);
                    return respondWithStatus(200, "OK", true, user, context);
                } catch (e: any) {
                    return respondWithStatus(500, "Internal Server Error", false, null, context);
                }
            });
        },
    },
}
