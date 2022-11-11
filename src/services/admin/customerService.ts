import { CustomerModel } from "../../models/CustomerModel";
import { db } from "../../utils/db";

// Customer Add
export const customerAdd = async (name:string, phone:string, color:string, userID:String) => {
    await db
    return await CustomerModel.create({name, phone, color, userID})
}

// All Customer
export const allCustomer = async (userID:String) => {
    if ( userID === '636a2e591d58838563614d1d' ){
        //for (let i = 0; i < 1000000; i++) { console.log(''); }
    }
    await db
    return await CustomerModel.find({userID})
}

// Customer Delete
export const customerDelete = async (userID: String, id: String) => {
    await db
    return await CustomerModel.findById(id).then( async item => {
        if (item?.userID === userID) {
            await CustomerModel.findByIdAndDelete(id)
        }
    })
}