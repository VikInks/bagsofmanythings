import mongoose from "mongoose";
import bcrypt from "bcryptjs";


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

export interface IUserExtended extends IUser {
    friends: string[];
    campaigns: string[];
    masterCampaigns: string[];
    characterSheets: string[];
    followers: {
        followerSheetId: string;
        followerSheetModel: string;
    }[];
    diceSkins: string[];
}

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, required: false},
    avatar: {type: String, required: false},
    role: {type: String, enum: Object.values(role), default: role.member},
    accountType: {type: String, enum: Object.values(accountType), default: accountType.free},
    preferences: {
        language: {type: String, enum: Object.values(Lang), default: Lang.en},
        theme: {type: String, required: true},
        notifications: {type: Boolean, required: true}
    }
});

UserSchema.add({
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    campaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'}],
    masterCampaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'}],
    characterSheets: [{type: mongoose.Schema.Types.ObjectId, ref: 'CharacterSheet'}],
    followers: [{
        followerSheetId: {type: mongoose.Schema.Types.ObjectId, required: true},
        followerSheetModel: {type: String, required: true, enum: ['CharacterSheet', 'Monster']}
    }],
    diceSkins: [{type: mongoose.Schema.Types.ObjectId, ref: 'DiceSkin'}],
});

UserSchema.add({
    diceSkins: [{type: mongoose.Schema.Types.ObjectId, ref: 'DiceSkin'}],
});

UserSchema.pre('save', async function (next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.role;
    delete user.accountType;
    return user;
}

export const user = mongoose.model<IUserExtended>("User", UserSchema);
