import {validateAndResponse} from "../utils/validate.response";
import {createUser, findUserByEmail} from "../../dal/user.dal";
import {exceptionHandler} from "../utils/exception.handler";
import {IResponseStatus, respondWithStatus} from "../utils/response.status";
import {signInSchema, signUpSchema} from "./validation/user.val";
import {contextType} from "../../config/context.type";
import bcrypt from "bcryptjs";
import {cookieManager} from "../../config/cookie.manager";
import {jwtManager} from "../../config/jwt.manager";
import {UserService} from "../service/user.service";

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

const userService = new UserService();

export const signResolvers = {
    Query: {
        async signIn(_parent: any, args: signInInterface, context: contextType) {
            return validateAndResponse(signInSchema, args, 'sign in', context, async () => {
                try {
                    if (!!context.user) return respondWithStatus(200, 'User already signed in', true, context.user, context);
                    const user = await findUserByEmail(args.email);
                    console.log(await bcrypt.compare(args.password, user?.password as string));
                    if (!!user && !await bcrypt.compare(args.password, user.password)) return respondWithStatus(401, 'Invalid credentials!', false, null, context);
                    const cookieValue = await cookieManager(jwtManager(user?._id.toString() as string, '24h' ),'login');
                    if(cookieValue) context.res.setHeader('Set-Cookie', cookieValue);
                    return respondWithStatus(200, 'User signed in', true, user, context);
                } catch (e: any) {
                    return exceptionHandler('sign in', e, context);
                }
            });
        },
        async signOut(_parent: any, args: any, context: any): Promise<IResponseStatus> {
            return validateAndResponse(null, args, 'sign out', context, async () => {
                try {
                    cookieManager(context, jwtManager(context.user, '0s'));
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
                    const existUserDict = await userService.getUserByEmail(args.email);
                    if(existingUser || existUserDict){
                        return exceptionHandler('User already exists', 409, context);
                    }
                    const user = await createUser(args);
                    await userService.addUser(user);
                    return respondWithStatus(201, 'User created', true, user, context);
                } catch (e: any) {
                    return exceptionHandler('create user', e, context);
                }
            });
        }
    }
}
