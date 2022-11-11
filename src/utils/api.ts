import axios from "axios"
import { IProduct } from "../models/api/IProduct"

const baseUrl= 'https://www.jsonbulut.com/json'
const ref= 'd1becef32825e5c8b0fc1b096230400b'

// https hatası için
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// axios config
const config= axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    params: { ref: ref}
    // headers: { 'token': 'llllll' }
    })

// product.php?ref=&start=0
export const allProduct = () => {
    const sendParams = {
        start: '0'
    }
    return config.get<IProduct>('product.php', {params: sendParams})
}