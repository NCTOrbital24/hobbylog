const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Hobby = mongoose.model("hobby", hobbySchema);

hobbySchema.pre("remove", async function (next) {
    try {
        const goals = this.goals;

        if (goals && goals.length > 0) {
            await Promise.all(
                goals.map(async (goalId) => {
                    await Goal.findByIdAndDelete(goalId);
                })
            );
        }

        next();
    } catch (err) {
        next(err);
    }
});

module.exports = Hobby;
