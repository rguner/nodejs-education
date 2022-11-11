import { UserModel } from "../../models/UserModel";
import { db } from "../../utils/db";

//export const userSave = ( name: string, email:string, password:string ) => {
export const  userSave = async( name: string, email:string, password:string ) => {    
    /*
    db.then( item => {
        UserModel.create({name, email, password}).then( item => {
            console.log("Save Success", item);
        })
    })
    */

    await db
    return await UserModel.create({name, email, password})
}

export const userEmailControl = async (email: string) => {
    await db
    return await UserModel.findOne({email: email})
}

export const userLoginControl = async (email:string, password:string) => {
    await db 
    return await UserModel.findOne({email, password})
}

export const userFindId = async (id: string) => {
    await db
    return await UserModel.findById(id)
}