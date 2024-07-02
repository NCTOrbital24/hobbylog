declare module 'react-native-push-notification' {
    import { Component } from 'react';

    interface PushNotificationObject {
        message: string;
        date?: Date | string;
        allowWhileIdle?: boolean;

    }

    class PushNotification {
        static configure(options: {
            onNotification: (notification: any) => void;
            requestPermissions?: boolean;
        }): void;
        static localNotificationSchedule(notification: PushNotificationObject): void;

    }

    export default PushNotification;
}
