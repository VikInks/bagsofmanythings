import {user} from '../model/user.schema';

export const findAllUsers = async () => user.find().lean();
export const findUserById = async (id: string) => user.findById(id).lean();
export const findUserByUsername = async (username: string) => user.findOne({username: username}).lean();
export const findUserByEmail = async (email: string) => user.findOne({email: email}).lean();
export const createUser = async (newUser: any) => {
    console.log('newUser: ', newUser);
    if (newUser) {
        newUser.charcterCount = 0;
        return new user(newUser).save();
    } else {
        console.log('newUser is undefined!');
    }
};
export const updateUser = async (id: string, updatedUser: any) => user.findByIdAndUpdate(id, updatedUser, {new: true}).lean();
export const deleteUser = async (id: string) => user.findByIdAndDelete(id).lean();
export const isAdmin = async (id: string) => user.findOne({_id:id, $where: function() {return this.role === 'admin'}}).lean();
export const isFriend = async (id: string) => user.findOne({_id:id, $where: function() {return this.accountType === 'friend'}}).lean();
export const verifyFreeAccount = async (id: string) => user.findOne({_id:id, $where: function() {return this.accountType === 'free'}}).lean();
export const findMyCharacterToPortfolio = async (userId: string) => user.find({_id: userId}).populate('characterSheets').lean();
export const addFriend = async (userId: string, friendId: string) => user.findByIdAndUpdate(userId, {$push: {friends: friendId}}).lean();
export const removeFriend = async (userId: string, friendId: string) => user.findByIdAndUpdate(userId, {$pull: {friends: friendId}}).lean();
