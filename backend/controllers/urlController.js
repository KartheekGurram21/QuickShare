const Endpoint = require('../models/endpointModel'); // Adjust the path accordingly

// Controller function to handle the endpoint check and data retrieval
const validateUrl = async (req, res) => {
    const { endpoint } = req.params;

    try {
        console.log(`Checking for endpoint: ${endpoint}`); // Log to track the endpoint being checked
        const exists = await Endpoint.scrutiny(endpoint);
        console.log('Result from scrutiny:', exists); // Log the result

        if (exists) {
            res.status(200).json(exists);
        } else {
            res.status(200).json({ message: "Not found, please upload" });
        }
    } catch (error) {
        console.error('Error in validateUrl:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { validateUrl };
