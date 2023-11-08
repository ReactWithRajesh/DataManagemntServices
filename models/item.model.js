const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Item Name is required']
    },
    vendorName: {
        type: String,
        required: [true, 'Vendor name is required']
    },
    vendorMobile: {
        type: Number,
        required: [true, 'Vendor mobile number is required'],
        unique: true
    },
    total: {
        type: Number,
        required: [true, 'Total is required']
    },
    paid: {
        type: Number,
        required: [true, 'Paid amount is required']
    },
    balance: {
        type: Number
    }
});

const BookingItem = mongoose.model('BookingItem', bookingSchema);

module.exports = BookingItem;