const multer = require('multer');
const zlib = require('zlib');
const Data = require('../models/dataModel');
const Endpoint = require('../models/endpointModel');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // 10 MB file size limit
}).single('file');

const uploadFile = async (req, res) => {
    try {
        const { title, email, size, fileType, expiryDate } = req.body;
        console.log(req.body)
        const { buffer, mimetype } = req.file;

        if (!fileType) {
            return res.status(400).json({ message: 'File type is required' });
        }

        const expiryDateParsed = new Date(expiryDate);

        // Log the original file size
        console.log('Original file size (bytes):', buffer.length);

        // Compress the file using gzip via zlib
        zlib.gzip(buffer, async (err, compressedBuffer) => {
            if (err) {
                console.error('Error compressing file:', err);
                return res.status(500).json({ message: 'Error compressing file', error: err.message });
            }
 
            // Log the compressed file size
            console.log('Compressed file size (bytes):', compressedBuffer.length);

            // Create or update the endpoint
            await Endpoint.createEndpoint(title);

            // Create new data entry with the compressed file
            const newData = await Data.createData(
                title,
                email,
                { data: compressedBuffer, contentType: mimetype },
                size,
                fileType,
                expiryDateParsed
            );

            res.status(201).json({
                message: 'File uploaded and compressed successfully',
                data: newData
            });
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({
            message: 'Error uploading file',
            error: error.message
        });
    }
};






const downloadFile = async (req, res) => {
    try {
        const { id } = req.params;  // Assuming 'id' is the endpoint or key in the request
        const exists = await Endpoint.scrutiny(id);  // Check if the endpoint exists

        if (!exists) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Find the file data in the Data model
        const data = await Data.findOne({ title: id });  // Adjust if 'title' or another field is used

        if (!data) {
            return res.status(404).json({ message: "File not found" });
        }

        // Decompress the file content using zlib
        zlib.unzip(data.content.data, (err, decompressedBuffer) => {
            if (err) {
                console.error('Error decompressing file:', err);
                return res.status(500).json({ message: 'Error decompressing file', error: err.message });
            }

            // Set the response headers for downloading the file
            res.set({
                'Content-Type': data.content.contentType,  // Set the file type (e.g., 'application/pdf')
                'Content-Disposition': `attachment; filename="${data.title}"`  // Set the file name for the download
            });

            // Send the decompressed file content
            return res.status(200).send(decompressedBuffer);  // Send the decompressed file buffer
        });

    } catch (error) {
        console.error('Error during file download:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};





const fileDetails = async (req, res) => {
    try {
        const { id } = req.params;  // Assuming 'id' is the endpoint or title
        const exists = await Endpoint.scrutiny(id);  // Check if the endpoint exists
        
        if (!exists) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Find the file metadata in the Data model
        const data = await Data.findOne({ title: id });  // Adjust if 'title' is the correct field
        
        if (!data) {
            return res.status(404).json({ message: "File not found" });
        }

        // Send the file details (metadata)
        res.status(200).json({
            title: data.title,
            size: data.size,
            fileType: data.fileType,
            expiryDate: data.expiryDate,
        });
    } catch (err) {
        console.error('Error fetching file details:', err);
        return res.status(500).json({
            message: 'Error fetching file details',
            error: err.message
        });
    }
};


module.exports = { uploadFile, upload, downloadFile, fileDetails };
