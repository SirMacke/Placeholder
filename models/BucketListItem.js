const { Schema, model } = require('mongoose');

const BucketListItem = model('BucketListItem', new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = BucketListItem;