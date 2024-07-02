const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    hobbyId: { type: Schema.Types.ObjectId, ref: 'Hobby', required: true },
    deadline: { type: Date, required: true },
    //badge: { type: Schema.Types.ObjectId, ref: 'Badge'}
});

const Goal = mongoose.model('goal', goalSchema);

module.exports = Goal;
