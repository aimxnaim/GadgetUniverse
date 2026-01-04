const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter blog title'],
        trim: true,
        maxLength: [200, 'Blog title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Please enter blog content']
    },
    excerpt: {
        type: String,
        maxLength: [500, 'Excerpt cannot exceed 500 characters']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    category: {
        type: String,
        enum: {
            values: [
                'Technology',
                'Reviews',
                'Tutorials',
                'News',
                'Tips & Tricks',
                'Product Guides',
                'Industry Insights'
            ],
            message: 'Please select correct category for blog'
        }
    },
    tags: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    numOfComments: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
