import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUserSchema {
    id: String,
    name: String,
    email: String,
    password: String
}
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

export const UserModel = mongoose.model('user', UserSchema)