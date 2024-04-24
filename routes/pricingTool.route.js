const express = require('express');
const PTRouter = express.Router();
const {hdvals,vesselInfo} = require('../models/pricingTool.model.js');
const {getQuoteList,saveQuote,updateQuote,deleteQuote,getQuoteFromList, // HDVals Specific
        deleteRows,swapRows,getRows,insertRows // Vessel_info specific
        } = require('../controllers/pricingTool.controller.js');


// HDVals STUFF /////////////////////////////////// 

//Retrieve quote details from the HdVals collection
PTRouter.get('/get/:uwrName/:quoteID/:BucketName', getQuoteFromList);

// Update Quote
PTRouter.put('/updateQuote', updateQuote);

// Delete Quote
PTRouter.delete('/deleteQuote', deleteQuote);

// Get all records but only high level quote info
PTRouter.get('/listQuotes', getQuoteList);

// Save Quote Version Info
PTRouter.post('/saveQuote', saveQuote);

// VESSEL INFO STUFF ///////////////////////////////////
PTRouter.get('/get/:quoteID', getRows);

// Update Rows, table dependent on data entered
PTRouter.put('/swapRows', swapRows);

//Delete vessel rows - need to pass quoteID and ppoidx
PTRouter.delete('/deleteRows', deleteRows);

// Insert / Add new rows to the vessel info
PTRouter.post('/insertRows', insertRows);

module.exports = PTRouter;