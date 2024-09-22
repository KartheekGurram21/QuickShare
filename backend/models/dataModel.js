const mongoose = require('mongoose');

// Data Schema
const dataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    content: {
        data: Buffer,
        contentType: String
    },
    size: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Static method for creating new data
dataSchema.statics.createData = async function(title, email, content, size, fileType, expiryDate) {
    const data = new this({
        title,
        email,
        content,
        size,
        fileType,
        expiryDate
    });

    try {
        return await data.save(); // Save the document and return it
    } catch (err) {
        console.error('Error saving document:', err);
        throw err;
    }
}

module.exports = mongoose.model('Data', dataSchema);
