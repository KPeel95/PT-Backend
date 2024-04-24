const {hdvals,vessel_infos} = require('../models/pricingTool.model.js');

// Provide high level summary of all quotes on record
const getQuoteList = async (req, res) => {
    try {
        // Find all records matching the provided version
        const quotes = await hdvals.find({});
        // Extract only the required fields from each record
        const formattedRecords = quotes.map(record => ({
            Name: record.hdvals.uwrName,
            Date: record.hdvals.currNow,
            QuoteID: record.hdvals.quoteID,
            QuoteName: record.hdvals.quoteName,
            id : record._id,
        }));
        res.status(200).json(formattedRecords); // Send the formatted records as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
}

//Save new quote
const saveQuote = async (req, res) => {
    try {
        const quote = await hdvals.create(req.body);
        res.status(200).json(quote);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

//Update new quote
const updateQuote = async (req, res) => {
    try {
        const id = req.body._id;
        const update = { $set: req.body }; // Use $set to update specific fields
        const product = await hdvals.updateOne({_id : id}, update);

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteQuote = async (req, res) => {
    try {
        // Delete from HDVals
        const quote = await hdvals.deleteOne(
            {_id : req.body._id},
        );
        // Delete from relevant vessel_infos
        const vessel = await vessel_infos.deleteMany(
            {QuoteID : req.body._id},
        );
        res.status(200).json({message:'Record deleted Successfully'});
    }  
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getQuoteFromList = async (req, res) => {
    try {
        const uwrName = req.params.uwrName;
        const quoteID = parseFloat(req.params.quoteID);
        const BucketName = parseFloat(req.params.BucketName);
        const quote = await hdvals.find({"hdvals.uwrName" : uwrName, "hdvals.quoteID" : quoteID, "buckets.BucketName" : BucketName});
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteRows = async(req,res) => {
    try {
        const ppoidxArray = req.body.ppoidxArray;
        const QuoteID = req.body.HDVals._id;
        const product = await vessel_infos.deleteMany({
             ppoidx :{$in : ppoidxArray},
            QuoteID: QuoteID
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const swapRows = async(req,res) => {
    try {
        // Need some logic to identify WHICH table to target, 
        let product = null;
        // 
        const rowsToUpdate = req.body.newRows;
        for (const row of rowsToUpdate) {
            const updatedValues = { ...row }
            product = await vessel_infos.findOneAndUpdate(
                {
                QuoteID:row.QuoteID,
                ppoidx:row.ppoidx
            },
             updatedValues);
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getRows = async(req,res) => {
    try {
        const QuoteID = req.params.quoteID;
        const product = await vessel_infos.find({QuoteID: QuoteID});
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

const insertRows = async(req,res) => {
    try{
        copyRows = req.body.copyRows;
        if (!Array.isArray(copyRows)) {
            // If copyRows is not an array, convert it to an array with one item
            copyRows = [copyRows];
        }
        for (const row of copyRows) {
            row.QuoteID = req.body.HDVals._id;
            const product = await vessel_infos.create(row);
        }
        res.status(200).json(message='Rows inserted successfully');
        }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    getQuoteList,
    saveQuote,
    updateQuote,
    deleteQuote,
    getQuoteFromList,
    deleteRows,
    swapRows,
    getRows,
    insertRows
};