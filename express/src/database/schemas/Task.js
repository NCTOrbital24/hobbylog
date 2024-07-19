const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    hobbyId: { type: Schema.Types.ObjectId, ref: "Hobby", required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    nextDueDate: { type: Date, required: true },
    lastCompleted: { type: Boolean },
    exp: {type: Number, required: true, default: 0},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
