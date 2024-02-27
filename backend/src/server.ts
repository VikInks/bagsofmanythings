import express, {Application} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from "./api/typeDefs/typeDefs.base";
import {resolvers} from "./api/resolvers/resolvers.base";
import {userTypeDefs} from "./api/typeDefs/user.typeDefs";
import {userResolvers} from "./api/resolvers/user.resolvers";
import {campaignTypeDefs} from "./api/typeDefs/campaign.typeDefs";
import {campaignResolvers} from "./api/resolvers/campaign.resolvers";
import {sheetTypeDefs} from "./api/typeDefs/sheet.typeDefs";
import {contextType} from "./config/context.type";
import mongoose from "mongoose";
import {createUser} from "./dal/user.dal";
import {signTypeDefs} from "./api/typeDefs/sign.typeDefs";
import {signResolvers} from "./api/resolvers/sign.resolvers";
import cors from "cors";
import {cookieManager} from "./config/cookie.manager";
import jwt from "jsonwebtoken";

const app: Application = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// todo : verify if the handle of the cookie need to be done in the context too
const server = new ApolloServer({
    typeDefs: [typeDefs, userTypeDefs, campaignTypeDefs, sheetTypeDefs, signTypeDefs],
    resolvers: [resolvers, userResolvers, campaignResolvers, signResolvers],
    context: ({req, res}: contextType): contextType => {
        const token = req.headers.cookie?.split(';').find(c => c.trim().startsWith('jwt='))?.split('=')[1]
        if (!token) return {req, res, user: null};
        const user = jwt.decode(token, {json: true} as jwt.DecodeOptions)?.toString();
        console.log('user: ', user);
        return {req, res, user: user};
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
        username: 'VikInks',
        email: 'a@a.com',
        password: 'a',
        avatar: 'src/image/admin/admin.webp',
        accountType: 'premium',
        role: 'admin',
        preferences: {
            language: 'fr',
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
