import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';

const AddGoal = ({ hobbyId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleAddGoal = async () => {
        try {
            const response = await axios.post(`http://<your-backend-url>/api/hobbies/${hobbyId}/goals`, {
                name,
                description,
                deadline,
            });
            scheduleNotification(deadline, name);
            console.log('Goal added successfully:', response.data);
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const scheduleNotification = (date, goalName) => {
        PushNotification.localNotificationSchedule({
            message: `Reminder: Your goal "${goalName}" is due today.`,
            date,
            allowWhileIdle: true,
        });
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    return (
        <View>
            <Text>Add Goal</Text>
            <TextInput
                placeholder="Goal Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Button title="Pick Deadline" onPress={showDatePicker} />
            <Modal
                transparent={true}
                visible={showPicker}
                animationType="slide"
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <DatePicker
                            date={deadline}
                            onDateChange={setDeadline}
                            mode="date"
                        />
                        <Button title="Confirm" onPress={() => setShowPicker(false)} />
                    </View>
                </View>
            </Modal>
            <Button title="Add Goal" onPress={handleAddGoal} />
        </View>
    );
};

export default AddGoal;
