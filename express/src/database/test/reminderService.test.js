// test/reminderService.test.js
const mongoose = require('mongoose');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const Goal = require('../models/Goal');
const checkAndSendReminders = require('../services/reminderService');
const sendReminder = require('../utils/sendReminder');

// Mock the sendReminder function
jest.mock('../utils/sendReminder');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('checkAndSendReminders', () => {
  it('should send reminders for goals with deadlines today', async () => {
    const today = new Date();
    const goal = new Goal({
      name: 'Test Goal',
      description: 'This is a test goal',
      hobbyId: new mongoose.Types.ObjectId(),
      deadline: today,
      reminderSent: false,
    });
    await goal.save();

    await checkAndSendReminders();

    // Ensure sendReminder was called
    expect(sendReminder).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test Goal' }));

    // Ensure goal was updated
    const updatedGoal = await Goal.findById(goal._id);
    expect(updatedGoal.reminderSent).toBe(true);
  });

  it('should not send reminders for goals with deadlines in the future', async () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day in the future
    const goal = new Goal({
      name: 'Future Goal',
      description: 'This is a future goal',
      hobbyId: new mongoose.Types.ObjectId(),
      deadline: futureDate,
      reminderSent: false,
    });
    await goal.save();

    await checkAndSendReminders();

    expect(sendReminder).not.toHaveBeenCalled();

    const updatedGoal = await Goal.findById(goal._id);
    expect(updatedGoal.reminderSent).toBe(false);
  });

  it('should not send reminders for goals with reminders already sent', async () => {
    const today = new Date();
    const goal = new Goal({
      name: 'Already Sent Goal',
      description: 'This goal already has a reminder sent',
      hobbyId: new mongoose.Types.ObjectId(),
      deadline: today,
      reminderSent: true,
    });
    await goal.save();

    await checkAndSendReminders();

    expect(sendReminder).not.toHaveBeenCalled();
  });
});
