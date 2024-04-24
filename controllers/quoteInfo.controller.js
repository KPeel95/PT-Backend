const {hdVals,vesselInfo} = require('../models/quoteInfo.model.js');

const getQuoteOptions = async (req, res) => {
    try {
        // Find all records matching the provided version
        const quotes = await QuoteVersion.find({});
        // Extract only the required fields from each record
        const formattedRecords = quotes.map(record => ({
            version: record.version,
            name: record.name,
            quote: record.quote_name,
            id : record._id
        }));
        res.status(200).json(formattedRecords); // Send the formatted records as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
};

// Retrieve quote that matches version num and name from the database
const getQuote = async (req, res) => {
    try {
        const quote_key = req.params.quotekey;
        const product = await QuoteVersion.find({_id : quote_key});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getQuoteId = async (req, res) => {
    try {
        const name = req.params.name;
        const version = parseFloat(req.params.version);
        const product = await QuoteVersion.find({name : name, version : version});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getVesselsFromId = async (req, res) => {
    try {
        const quote_key = req.params.quotekey;
        const product = await QuoteVessel.find({quote_key : quote_key});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const putVessel = async (req, res) => {
    try {
        const id = req.body._id;
        const update = { $set: req.body }; // Use $set to update specific fields
        const product = await QuoteVessel.updateOne({_id : id}, update);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const postVessel = async (req, res) => {
    try {
        const product = await QuoteVessel.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteVessel = async(req,res) => {
    try{
        const ids = req.params.id
        const product = await QuoteVessel.deleteOne({_id : id});
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const postQuote = async (req, res) => {
    try {
        const product = await QuoteVersion.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    getQuote,
    getQuoteId,
    getQuoteOptions,
    getVesselsFromId,
    putVessel,
    postVessel,
    deleteVessel,
    postQuote
}