import express, { response } from "express";
import { IUserLogin } from "../../models/IUserLogin";
import { userLoginControl } from "../../services/admin/userService";
import { eventEmitter, eventEnum } from "../../utils/events";
import { encrypt } from "../../utils/util";

export const loginController = express.Router();

let errorMessage='';
// get login
loginController.get('/', (req, res) => {
    // res.write("<h1> Welcome App Title </h1>")
    res.render('admin/login', {errorMessage: errorMessage})
    errorMessage=''
})

// post login
loginController.post('/login', (req, res) => {
   try {
    const user: IUserLogin = req.body; 
    if (user.email===undefined || user.password===undefined || user.email==='' || user.password==='') {
        throw new Error("email or password is empty or null");
    }
    userLoginControl(user.email, user.password).then(userItem => {
        if (userItem) {
            // session create
            req.session.item = {
                id: userItem.id!,
                name : userItem.name!,
                email : userItem.email!,
                password: userItem.password!    
            }
            console.log(user.remember)
            // cookie control
            if ( user.remember && user.remember==='on') {
               res.cookie('admin', encrypt(userItem.id), {maxAge: 1000*60*60*24, secure: true})
            }
            eventEmitter.emit(eventEnum.fncOne, userItem.name!)
            res.redirect('../admin/dashboard')       
        } else {
            errorMessage = "Username or password failed"
            res.redirect('../admin')
        }
    })
    /*
    if (user.email==='rguner@gmail.com' && user.password==='12345') {
        console.log('Login Success');
        } else {
            console.log('Login Failed')
        }
        */
   
   } catch(error:any) {
        console.log("Login error", error.message)
        errorMessage = error.message
        res.redirect('../admin')
   }

   
})

loginController.get('/logout', (req, res) => {
   req.session.destroy((err) => {
        if (!err) {
            res.cookie('admin', '', {maxAge: 0})
            res.redirect('../admin'
            )
        }
   })
})