const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { verifyUser, verifyToken } = require('../authentication');
const BookingItem = mongoose.model('BookingItem');

//insert record function
function insertRecord(req, res) {
    var Item = new BookingItem()
    Item.itemName = req.body.itemName;
    Item.vendorName = req.body.vendorName;
    Item.vendorMobile = req.body.vendorMobile;
    Item.total = req.body.total || 0;
    Item.paid = req.body.paid || 0;
    Item.balance = (req.body.total - req.body.paid)
    Item.save()
        .then((docs) => {
            res.send({ docs, msg: 'Item Record added Successfully.' })
        })
        .catch((error) => {
            console.error("Error during insert: ", error);
            res.status(400).send({ error });
        });
}

//update records functions 
function updateRecord(req, res) {
    BookingItem.findOneAndUpdate(
        { _id: req.body._id },
        {
            ...req.body,
            balance: req.body.total - req.body.paid
        },
        { new: false },
    ).then((docs) => {
        res.send({ msg: 'Record updated Successfully.' })
    }).catch((err) => {
        res.status(400).send({ error: err.message })
        console.error("Error during update : " + err)
    })
}

//get list function 
const getlists = async (req, res) => {
    try {
        const Items = await BookingItem.find().select('itemName vendorName vendorMobile total paid balance');
        const totalItems = await BookingItem.countDocuments(); // Get the total count of items

        return { totalItems: totalItems, Items: Items, };
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.error("Error during data retrieve: " + err);
    }
}

//list route 
router.get('/list', verifyToken, verifyUser, async (req, res) => {

    const Items = await getlists(req, res);

    if (Items) res.json({ Items });
})

//add item route 
router.post('/', verifyToken, verifyUser, async (req, res) => {
    const existingItem = await BookingItem.findOne({ $or: [{ itemName: req.body.itemName }, { vendorMobile: req.body.vendorMobile }] });
    let item = existingItem ? existingItem?.itemName === req.body.itemName : false
    let mobile = existingItem ? existingItem?.vendorMobile === req.body.vendorMobile : false

    if (!req.body._id) {
        if (item || mobile) {
            res.status(400).send({
                error: `A vendor with this ${mobile && item ? "mobile and item" : item ? 'item' : 'mobile'} already exists.`
            });
        } else {
            insertRecord(req, res);
        }
    }
    else {
        updateRecord(req, res);
    }
})

//get by id route
router.get('/:_id', verifyToken, verifyUser, (req, res) => {
    BookingItem.findById(req.params._id,)
        .then((doc) => {
            res.json({ doc })
        }).catch((err) => {
            console.error("Error during data retriving by id :" + err)
        })
})

//delete by id route 
router.get('/delete/:_id', verifyToken, verifyUser, (req, res) => {
    if (req.params._id) {
        BookingItem.findByIdAndRemove(req.params._id,)
            .then((doc) => {
                if (doc) res.json({ doc, msg: 'Record deleted successfully.' })
                else res.json({ error: 'Record Not Found' })
            })
            .catch((err) => console.error("Error during deletion :" + err))
    }
    else res.status(401).json({ msg: `Id is required for deletion.` })
})

module.exports = router