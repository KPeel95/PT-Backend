const express = require('express');
const quoteRouter = express.Router();
const quoteInfo = require('../models/pricingTool.model.js');
const {getQuote, getQuoteOptions,getQuoteId,getVesselsFromId,putVessel,postVessel,deleteVessel,postQuote} = require('../controllers/quoteInfo.controller.js');




//quoteRouter.get('/:quote_key', getQuoteId);

// Get all records but only high level quote info
quoteRouter.get('/search', getQuoteOptions);

// Save a new record
quoteRouter.post('/save', postVessel);

// Update records according to the quote key
quoteRouter.put('/save/', putVessel)

// Save a new version
quoteRouter.post('/save/version', postQuote);

// Delete records according to the id
quoteRouter.delete('/delete/:id', deleteVessel)

// Get one record, according to the quote_key
quoteRouter.get('/search/:quotekey', getQuote);

// Get all Vessel Info from quote key
quoteRouter.get('/search/vessel/:quotekey', getVesselsFromId);

// Get one record, according to the name / version
quoteRouter.get("/search/:name/:version/", getQuoteId)



module.exports = quoteRouter;