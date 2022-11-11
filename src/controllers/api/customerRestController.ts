import express from 'express'
import { IUserLogin } from '../../models/IUserLogin'
import { allCustomer, customerAdd, customerDelete } from '../../services/admin/customerService'
import { userLoginControl } from '../../services/admin/userService'
import { IRest } from '../../utils/IRest'
export const customerRestController = express.Router()

customerRestController.post('/login', (req, res) => {
    const user: IUserLogin = req.body
    userLoginControl(user.email, user.password).then(userItem => {
        if (userItem) {
            req.session.item = {
                id: userItem.id,
                name: userItem.name!,
                email: userItem.email!,
                password: userItem.password!
            }
            const sendItem: IRest = {
                status: true,
                result: userItem
            }
            res.json(sendItem)
        } else {
            const sendItem: IRest = {
                status: false,
                result: 'UserName or Password Fail'
            }
            res.json(sendItem)
        }
    })
})

customerRestController.post('/add', (req, res) => {
    const userID = req.session.item?.id
    const name = req.body.name
    const phone = req.body.phone
    const color = req.body.color

    customerAdd(name, phone, color, userID!).then(item => {
        if (item) {
            const sendItem: IRest = {
                status: true,
                result: item
            }
            res.json(sendItem)
        }else {
            const sendItem: IRest = {
                status: false,
                result: 'Insert Fail'
            }
            res.json(sendItem)
        }
    })
    
})


customerRestController.get('/list', (req, res) => { 
    // wait()
    const userID = req.session.item?.id
    allCustomer(userID!).then(response => {
        const sendItem: IRest = {
            status: true,
            result: response
        }
        res.json(sendItem)
    })
})


customerRestController.get('/delete', async (req, res) => { 
    const userID = req.session.item?.id
    const id = req.body.id
    try {
        await customerDelete(userID!, id ).then( () => {
            const sendItem: IRest = {
                status: true,
                result: "Delete Success"
            }
            res.json(sendItem)
        }
    )
    } catch (error) {
        const sendItem: IRest = {
            status: false,
            result: "Delete Fail"
        }
        res.json(sendItem)
    }

})

function wait() {
    // stuff you want to happen right away
    console.log('Wait started...');
    var waitTill = new Date(new Date().getTime() + 10 * 1000);
    while(waitTill > new Date()){}
    console.log('Wait ended');
}
