const mongoose = require('mongoose');

// Define a schemaless schema
const schemalessSchema = mongoose.Schema({}, { strict: false });

// Create a model based on the schemaless schema
const hdvals = mongoose.model('hdVal', schemalessSchema);
const vessel_infos = mongoose.model('vessel_info', schemalessSchema);

// Export both models
module.exports = {
    hdvals: hdvals,
    vessel_infos: vessel_infos
};