import express from 'express'
import store from 'store'

export const detailController = express.Router()

detailController.get('/detail', (req, res) => {
    const item = store.get('item')
    res.render('admin/detail', {item: item})
})