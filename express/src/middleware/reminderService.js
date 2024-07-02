
const Goal = require('../schemas/Goal');
const sendReminder = require('../utils/sendReminder');

const checkAndSendReminders = async () => {
    const today = new Date();
    const goals = await Goal.find({ deadline: { $lte: today }, reminderSent: false });

    goals.forEach(async (goal) => {
        await sendReminder(goal);
        goal.reminderSent = true;
        await goal.save();
    });
};

setInterval(checkAndSendReminders, 24 * 60 * 60 * 1000); 

module.exports = checkAndSendReminders;