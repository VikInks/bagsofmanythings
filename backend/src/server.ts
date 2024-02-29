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
import jwt, {JwtPayload} from "jsonwebtoken";
import {seed} from "./mockup_data";
import * as Process from "process";
import {cookieManager} from "./config/cookie.manager";
import {IncomingHttpHeaders} from "node:http";

const app: Application = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com'
    ],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
        'cookie',
    ],
};

const extractTokenFromCookies = (headers: IncomingHttpHeaders): string | undefined => {
    return headers.cookie?.split(';').find(c => c.trim().startsWith('jwt='))?.split('=')[1];
}

const verifyAndDecodeToken = (token: string): string | null => {
    try {
        const secret = process.env.JWT_SECRET || 'SECRET_KEY';
        const decoded: string | JwtPayload = jwt.verify(token, secret);
        if (decoded && typeof decoded === 'object') {
            const userId = decoded.id;
            if (typeof userId === 'string') {
                return userId;
            }
        }
        console.error('JWT does not contain a valid userId or username');
        return null;
    } catch (error) {
        console.error(`Failed to verify token: ${error}`);
        return null;
    }
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = new ApolloServer({
    typeDefs: [typeDefs, userTypeDefs, campaignTypeDefs, sheetTypeDefs, signTypeDefs],
    resolvers: [resolvers, userResolvers, campaignResolvers, signResolvers],
    context: async ({req, res}: contextType): Promise<contextType> => {
        const token = extractTokenFromCookies(req.headers);
        let user = null;
        if (token) {
            user = verifyAndDecodeToken(token);
        }

        if(!user){
            const cookieValue = await cookieManager(null, 'logout');
            if(cookieValue) res.setHeader('Set-Cookie', cookieValue);
        }
        return {req, res, user};
    }
});

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
    await createUser(admin);
}

server.start().then(() => {
    server.applyMiddleware({app, cors: false, path: '/graphql'});

    mongoose.connect('mongodb://mongodb:27017/bagsofmanythings')
        .then(async () => {
            console.log('Connected to MongoDB');
            if(!Process.env.PRODUCTION) await cleanDB().then(() => console.log('Database cleaned'));
            await createAdmin().then(() => console.log('Admin user created'));
            await seed().then(res => console.log(res));
        })
        .catch(err => console.error(err));

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
