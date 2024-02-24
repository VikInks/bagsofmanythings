import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    id?: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    role?: string;
    accountType?: string;
    preferences: {
        language: Lang;
        theme: string;
        notifications: boolean;
    };
}

enum Lang {
    en = "en",
    fr = "fr",
}

enum role {
    member = 'member',
    admin = 'admin'
}

enum accountType {
    free = 'free',
    premium = 'premium',
    friend = 'friend'
}

export const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio: {type: String, required: false},
    avatar: {type: String, required: false},
    role: {type: String, enum: Object.values(role), default: role.member},
    accountType: {type: String, enum: Object.values(accountType), default: accountType.free},
    preferences: {
        language: {type: String, enum: Object.values(Lang), default: Lang.en},
        theme: {type: String, required: true},
        notifications: {type: Boolean, required: true}
    },
});

userSchema.pre('save', async function (next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.role;
    delete user.accountType;
    return user;
}

export const user = mongoose.model<IUser>("User", userSchema);
