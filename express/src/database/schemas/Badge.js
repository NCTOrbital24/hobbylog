const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: {type: String, required: true},
    
});

const Goal = mongoose.model('badge', badgeSchema);

module.exports = Badge;
