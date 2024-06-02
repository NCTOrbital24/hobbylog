# HobbyLog
- yet another hobby tracker project for Orbital
## About this project
**HobbyLog** is a hobby tracker that aims to make building habits and working on your hobbies fun and interactive. Generate hobbies, set goals and reminders, and see what your friends are up to (eventually)!

## Features
- **User Authentication:** -  Register and login to your own profile. (Implemented)
- **Progress Tracking** - The core feature of the application is the ability to create and customise hobbies, with achievement levels that track one’s progress in a hobby.
- **Goal Setting** - Set short term and long term goals, as well as weekly/monthly tasks. Set reminders for them and catalog your progress by uploading images.
- **Shareable hobby templates** - Export and import hobby templates created by other users, allowing you to easily customise and adapt the hobby trackers of others for personal use.
- **Community features** - The ability to search for other user’s profiles, hobbies, and their progress.
- **Co-op mode** - Allow users to work on the same hobby together, allowing them to track the progress of others and the goals that they have completed.

## Tech Stack
- **React-native:** For front-end development. Written in **JavaScript/TypeScript**.
- **ExpressJS:** For back-end development, used to build a RESTful API with **NodeJS**.
- **MongoDB:** Database used for storing (seemingly) important stuff.

## Want to try?
### If you want to run this locally:
### This repository contains two folders: 'express', the expressJS server, and 'HobbyLog', the react-native app.
1. clone the repository with ```bash git clone https://github.com/NCTOrbital24/hobbylog.git ```
2. Install dependencies:
   a. Go to ./express ```bash cd ./express ``` and run ```bash npm install``` to install all the dependencies. Start the server with ```node npm run start```
   b. Go to ./HobbyLog ```bash cd ../HobbyLog ``` (assuming you did step a) and run ```bash npm install``` to install all the dependencies
3. This is where things start to get funky. Change **backendLink** in ```./HobbyLog/app/src/constants/constants.js``` to the server's port.
   **It's important to note that emulators may not be able to reach localhost ports. In that case, you will have to forward the port your server is running on.**
4. Run the app with ```bash npx expo start```

## If you want to run this online:
### Install the apk from here: [Milestone 1](https://expo.dev/artifacts/eas/4mxqpzsGZeH2wR9YULjgRj.apk)
1. Run the app and hope that the server is running.
   


