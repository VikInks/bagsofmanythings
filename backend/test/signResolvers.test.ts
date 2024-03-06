// import { loadFeature, defineFeature } from "jest-cucumber";
// import { signResolvers } from "../src/api/resolvers/sign.resolvers";
// import { user as User } from "../src/model/user.schema";
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import {contextType} from "../src/config/context.type";
//
// const mongodb = new MongoMemoryServer();
//
// const feature = loadFeature("./features/myFeature.feature");
//
// beforeAll(async () => {
//     const uri = mongodb.getUri();
//     await mongoose.connect(uri);
// });
//
// afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongodb.stop();
// });
//
// defineFeature(feature, (test) => {
//     let user : { email: string, password: string, username?: string, avatar?: string };
//     let signInResult : any;
//     let signUpResult : any;
//     let signOutResult : any;
//
//     test("User tries to sign-in", ({ given, when, then }) => {
//         given("a user with email {string} and password {string}", async (email: string, password: string) => {
//             user = {email, password};
//             await User.create(user);
//         });
//
//         when("the user tries to sign in", async () => {
//             signInResult = await signResolvers.Query.signIn(null, user, {} as contextType);
//         });
//
//         then("the sign in should succeed", async () => {
//             expect(signInResult.success).toBe(true);
//             expect(signInResult.user).toEqual(expect.any(Object));
//         });
//     });
//
//     test("User tries to sign-up", ({ given, when, then }) => {
//         given('a user tries to sign up with email {string}, password {string} and username {string}', async (email: string, password: string, username?: string, avatar?: string) => {
//             user = {email, password, username, avatar};
//         });
//
//         when('the user tries to sign up', async () => {
//             signUpResult = await signResolvers.Mutation.signUp(null, {
//                 username: user.username as string,
//                 email: user.email,
//                 password: user.password,
//                 avatar: user.avatar
//             }, {} as contextType);
//         });
//
//         then('the sign up should succeed', async () => {
//             expect(signUpResult.success).toBe(true);
//             expect(signUpResult.user).toEqual(expect.any(Object));
//         });
//     });
//
//     test("User tries to sign-out", ({ when, then }) => {
//         when('the user tries to sign out', async () => {
//             signOutResult = await signResolvers.Query.signOut(null, {}, {} as contextType);
//         });
//
//         then('the sign out should succeed', async () => {
//             expect(signOutResult.success).toBe(true);
//         });
//     });
// });
