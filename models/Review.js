const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    content: {
        type: String, 
        required: [true, "Reason for this rating"]
    },
    articles: {
        type: mongoose.Types.ObjectId,
        ref: 'Article',
    },
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;