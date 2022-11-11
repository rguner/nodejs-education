import express from "express"
import { fncInfo } from "../../services/site/homeService"

export const homeController = express.Router()

const pageTitle = "Home Controller Title"
const description = "Description Bölümü"

homeController.get('/', (req, res) => {
    console.log(req.ip)
    // res.write("<h1> Welcome App Title </h1>")
    // res.render('site/home', {title: pageTitle, description: description })
    res.render('site/home', fncInfo() )
})