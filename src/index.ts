import dotenv from 'dotenv';
dotenv.config();
    
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userSave, userEmailControl, userFindId } from "./services/admin/userService";
import session from "express-session";
import { IUserSchema, UserModel } from "./models/UserModel";
import { fncCall, fncCallSync } from './utils/action';
import { createData, readData } from './utils/fileUsing';
import { fncCallWithThen } from './utils/actionPromise';
import { logger } from './utils/useWinston';

//fncCallSync()
//fncCall()
fncCallWithThen()

//createData()
//readData()

const app = express()
const port= 8080

// cookie config
app.use(cookieParser())


// session config
//const sessionKey='key123'
const sessionKey=process.env.SESSION_KEY!
const sessionConfig= session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true

})
// session data type 
declare module 'express-session' {
    interface SessionData {
        item: IUserSchema
    }
}

app.use(sessionConfig)

userEmailControl("zehra@gmail.com").then(emailItem=> {
    if (!emailItem) {
        userSave("Zehra Bilsin", "zehra@gmail.com", "12344").then(item=> {
            console.log(item)
        })
    } else {
        console.log("user already defined")
    }
})


// EJS config
app.set( "views", path.join( __dirname, "views" ) );
app.set('view engine', 'ejs');


// body-parser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// global filter
app.use( async ( req, res, next ) => {
    const url = req.url
    const ip= req.ip
    // logger
    logger.info('url: ' + url + ' iP:' + ip)
    try {
        const obj:any = {}
        obj.sum(10,50) 
    } catch (error:any) {
        logger.log({
            level: 'error',
            message: error.message,
        }) 
    }  
    // admin Control
    if ( url.includes('/api') || url === '/admin' || url === '/admin/login' ) {
        next()
    }else {
        // cookie control
        if ( req.cookies.admin ) {
            let id = req.cookies.admin as string
            id = decrypt(id)
             await userFindId(id).then(user => {
                if (user) {
                    req.session.item = {
                        id: user.id!,
                        name: user.name!,
                        email: user.email!,
                        password: user.password!
                    }
                }
            })
        }
        if ( !req.session.item ) {
            res.redirect('../admin')
        }else {
            res.locals.user = req.session.item
            next()
        }
    }
})

// site import controller
import {homeController} from './controllers/site/homeController'
// router

app.use('/', homeController)

import {loginController} from './controllers/admin/loginController'
import { dashboardController } from "./controllers/admin/dashboardController";
import { settingsController } from "./controllers/admin/settingsController";
import { decrypt } from "./utils/util";
import { detailController } from './controllers/admin/detailController';
import { customerRestController } from './controllers/api/customerRestController';



//app.use('/admin', loginController)
app.use('/admin', [
    loginController,
    dashboardController,
    settingsController,
    detailController
])

// api controller
app.use('/api', [
    customerRestController
])



/*
app.get('/', (req, res) => {
    console.log(req.ip)
    // res.write("<h1> Welcome App Title </h1>")
    res.render('site/home')
})
*/

app.listen(port, ()=> {
    console.log('http://localhost:' + port)
})