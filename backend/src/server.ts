import express, {Application} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from "./api/typeDefs/typeDefs.base";
import {resolvers} from "./api/resolvers/resolvers.base";
import {userTypeDefs} from "./api/typeDefs/user.typeDefs";
import {userResolvers} from "./api/resolvers/user.resolvers";
import {campaignTypeDefs} from "./api/typeDefs/campaign.typeDefs";
import {campaignResolvers} from "./api/resolvers/campaign.resolvers";
import {portfolioTypeDefs} from "./api/typeDefs/portfolio.typeDefs";
import {sheetTypeDefs} from "./api/typeDefs/sheet.typeDefs";
import {contextType} from "./config/context.type";
import mongoose from "mongoose";
import {createUser} from "./dal/user.dal";
import {signTypeDefs} from "./api/typeDefs/sign.typeDefs";
import {signResolvers} from "./api/resolvers/sign.resolvers";

const app: Application = express();

// todo : verify if the handle of the cookie need to be done in the context too
const server = new ApolloServer({
    typeDefs: [typeDefs, userTypeDefs, campaignTypeDefs, portfolioTypeDefs, sheetTypeDefs, signTypeDefs],
    resolvers: [resolvers, userResolvers, campaignResolvers, signResolvers],
    context: ({req, res}: contextType): contextType => {
        const user = req.headers.cookie?.split(';').find(c => c.trim().startsWith('jwt='))?.split('=')[1]
        if (!user) return {req, res, user: null};
        return {req, res, user};
    }
});

// todo: PROD add env file
// todo: PROD delete cleanDB
// todo: createAdmin should not be done in the code, find another solution to avoid having it in the code
async function cleanDB() {
    await mongoose.connection.db.dropDatabase();
}

async function createAdmin() {
    const admin = {
        username: 'admin',
        email: 'a@a.com',
        password: 'a',
        avatar: 'src/image/admin/admin.webp',
        role: 'admin',
        preferences: {
            language: 'en',
            theme: 'dark',
            notifications: true
        }
    };
    await createUser(admin).then(savedUser => console.log(savedUser));
}

server.start().then(async res => {
    server.applyMiddleware({app, path: '/graphql'});

    mongoose.connect('mongodb://mongodb:27017/bagsofmanythings')
        .then(async () => {
            console.log('Connected to MongoDB')
            await cleanDB().then(() => console.log('Database cleaned'));
            await createAdmin().then(() => console.log('Admin user created'));
        })
        .catch(err => console.error(err));

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
