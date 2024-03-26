import {validateAndResponse} from "../utils/validate.response";
import {createUser, findUserByEmail} from "../../data_access/user.dal";
import {exceptionHandler} from "../utils/exception.handler";
import {IResponseStatus, respondWithStatus} from "../utils/response.status";
import {signInSchema, signUpSchema} from "./validation/user.val";
import {contextType} from "../../config/context.type";
import bcrypt from "bcryptjs";
import {cookieManager} from "../../config/cookie.manager";
import {jwtRefreshManager} from "../../config/jwt.manager";
import SessionManager from "../../service/session.manager";

interface signUpInterface {
    username: string,
    email: string,
    password: string,
    avatar?: string
}

interface signInInterface {
    email: string,
    password: string
}

export const signResolvers = {
    Query: {
        async signIn(_parent: any, args: signInInterface, context: contextType) {
            return validateAndResponse(signInSchema, args, 'sign in', context, async () => {
                try {
                    if (!!context.user) return respondWithStatus(200, 'User already signed in', true, context.user, context);
                    const user = await findUserByEmail(args.email);
                    if (!!user && !await bcrypt.compare(args.password, user.password)) return respondWithStatus(401, 'Invalid credentials!', false, null, context);
                    const newSessionId = SessionManager.createSession(user?._id.toString()!);
                    const token = jwtRefreshManager(newSessionId, '10h');
                    const cookieValue = cookieManager(token, 'login');
                    context.res.setHeader('Set-Cookie', cookieValue);
                    return respondWithStatus(200, 'User signed in', true, user, context);
                } catch (e: any) {
                    return exceptionHandler('sign in', e, context);
                }
            });
        },
        async signOut(_parent: any, args: any, context: any): Promise<IResponseStatus> {
            return validateAndResponse(null, args, 'sign out', context, async () => {
                try {
                    const cookieValue = cookieManager(null, 'logout');
                    context.res.setHeader('Set-Cookie', cookieValue);
                    SessionManager.deleteUserSession(sessionId);
                    return respondWithStatus(200, 'User signed out', true, null, context);
                } catch (e: any) {
                    return exceptionHandler('sign out', e, context);
                }
            });
        }
    },
    Mutation: {
        async signUp(_parent: any, args: signUpInterface, context: contextType): Promise<IResponseStatus> {
            return validateAndResponse(signUpSchema, args, 'sign up', context, async () => {
                try {
                    const existingUser = await findUserByEmail(args.email);
                    if (existingUser) {
                        return exceptionHandler('User already exists', 409, context);
                    }
                    const user = await createUser(args);
                    if (!user) return exceptionHandler('User not created', 500, context);
                    return respondWithStatus(201, 'User created', true, user, context);
                } catch (e: any) {
                    return exceptionHandler('create user', e, context);
                }
            });
        }
    }
}
