const mongoose = require('mongoose');

// Endpoint Schema
const endpointSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Static method for checking if an endpoint exists and retrieving associated data
endpointSchema.statics.scrutiny = async function(endpoint) {
    try {
        console.log(`Searching for endpoint: ${endpoint}`); // Log the endpoint being searched
        const exists = await this.findOne({ endpoint });
        console.log('Search result:', exists); // Log the search result (null or data)
        return exists || null;
    } catch (error) {
        console.error('Error in scrutiny:', error);
        throw error;
    }
};


// Static method for creating a new endpoint
endpointSchema.statics.createEndpoint = async function(name) {
    try {
        const newEndpoint = new this({ endpoint: name });
        return await newEndpoint.save();
    } catch (error) {
        console.error('Error creating endpoint:', error);
        throw error; 
    }
};

// Create the model
module.exports = mongoose.model('Endpoint', endpointSchema);
