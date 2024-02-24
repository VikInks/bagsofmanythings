import {user} from '../model/user.schema';

export const findAllUsers = async () => user.find();
export const findUserById = async (id: string) => user.findById(id);
export const findUserByUsername = async (username: string) => user.findOne({username: username});
export const findUserByEmail = async (email: string) => user.findOne({email: email});
export const createUser = async (newUser: any) => new user(newUser).save();
export const updateUser = async (id: string, updatedUser: any) => user.findByIdAndUpdate(id, updatedUser, {new: true});
export const deleteUser = async (id: string) => user.findByIdAndDelete(id);
export const isAdmin = async (id: string) => user.findOne({_id:id, $where: function() {return this.role === 'admin'}});
