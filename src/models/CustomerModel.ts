import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface ICustomerSchema {
    id: string,
    name: string,
    phone: string,
    color: string,
    userID: string
}

const CustomerSchema = new Schema({
    name: String,
    phone: String,
    color: String,
    userID: String
})

export const CustomerModel = mongoose.model('customer', CustomerSchema)