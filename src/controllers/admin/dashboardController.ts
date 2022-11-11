import express from 'express'
import { allCustomer, customerAdd, customerDelete } from '../../services/admin/customerService'
export const dashboardController = express.Router()


dashboardController.get('/dashboard', async (req, res) => {
   await allCustomer(req.session.item?.id!).then(items => {
        res.render('admin/dashboard', {items: items})
    })
})

// customer add
dashboardController.post('/customerAdd', async (req, res, next) => {
    const name = req.body.name
    const phone = req.body.phone
    const color = req.body.color
    await customerAdd(name, phone, color, req.session.item?.id!).then(item => {
        console.log("Insert Success");
    })
    res.redirect('../admin/dashboard')
})

// customer delete
dashboardController.get('/customerDelete', async (req, res) => {
    console.log( req.query.id );
    await customerDelete(req.session.item?.id!, String(req.query.id) ).then(item => {
        console.log("Delete Success");
    })
    res.redirect('../admin/dashboard')
})
