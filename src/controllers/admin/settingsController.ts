import express from 'express'
import store from 'store'
import { Bilgiler } from '../../models/api/IProduct'
import { allProduct } from '../../utils/api'

export const settingsController = express.Router()

let arr:Bilgiler[] = []
settingsController.get('/settings', (req, res) => {
    allProduct().then(item => {
        arr = item.data.Products[0].bilgiler
        res.render('admin/settings', {arr: arr})
    })
})

settingsController.get('/productDetail', (req, res) => {
    
    const stIndex = req.query.index as string
    const index = parseInt(stIndex)
    const item = arr[index]
    //localStorage.setItem('item', JSON.stringify(item))
    store.set('item', item )
    
    res.redirect('../admin/detail')
})