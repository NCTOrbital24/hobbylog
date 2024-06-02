# HobbyLog
- yet another hobby tracker project for Orbital
- https://docs.google.com/document/d/1kn6f5DI_kcPe4xdSFbr5MbLerr5grkbVOMUIGb4VkJY/edit?usp=sharing
## About this project
Ever tell yourself "Alright, this time, I'm going to start a project and stick to it," only to give up the next hour?

<span style="font-size: 48;">**HobbyLog**</span> is a hobby tracker for anyone striving to build consistent and meaningful habits amidst their busy lives.  Generate hobbies, set goals and reminders, earn XP and badges, and see what your friends are up to (eventually)!

## Features
- **User Authentication:** -  Register and login to your own profile. (Implemented)
- **Progress Tracking** - The core feature of the application is the ability to create and customise hobbies, with achievement levels that track one’s progress in a hobby. (Planned)
- **Goal Setting** - Set short term and long term goals, as well as weekly/monthly tasks. Set reminders for them and catalog your progress by uploading images. (Planned)
- **Achievements** - Earn EXP and Achivements as you develop your skills. They don't do anything (and most likely will never), but they're (probably) pretty! (Planned)
- **Shareable hobby templates** - Export and import hobby templates created by other users, allowing you to easily customise and adapt the hobby trackers of others for personal use. (Planned)
- **Community features** - The ability to search for other user’s profiles, hobbies, and their progress. (Planned)
- **Co-op mode** - Allow users to work on the same hobby together, allowing them to track the progress of others and the goals that they have completed. (Planned)

## Tech Stack
- **React-native:** For front-end development. Written in **JavaScript/TypeScript**.
- **ExpressJS:** For back-end development, used to build a RESTful API with **NodeJS**.
- **MongoDB:** Database used for storing (seemingly) important stuff.

## Want to try?
### If you want to run this locally: Note: You need to have NodeJS installed.
### This repository contains two folders: 'express', the expressJS server, and 'HobbyLog', the react-native app.
1. clone the repository with ```bash git clone https://github.com/NCTOrbital24/hobbylog.git ```
2. Install dependencies:
   a. Go to ./express ```cd ./express ``` and run ```npm install``` to install all the dependencies. Start the server with ```node npm run start```
   b. Go to ./HobbyLog ```cd ../HobbyLog ``` (assuming you did step a) and run ```npm install``` to install all the dependencies
3. This is where things start to get 𝓯𝓻𝓮𝓪𝓴𝔂. Change **backendLink** in ```./HobbyLog/app/src/constants/constants.js``` to the server's port.
   The server may be up, which in that case, just skip to step 4. You can check if the server is running by opening [this webpage](domain=prepared-perch-dashing.ngrok-free.app). If it says 'OK', the server is running.
   **It's important to note that emulators may not be able to reach localhost ports. In that case, you will have to forward the port your server is running on.**
4. Run the app with ```npx expo start```
5. If this didn't work for you please let me know

## If you want to run this online:
### Install the apk from here: (Will update when the preview build can be built successfully)
1. Install and run the app on your android device/emulator and hope that the server is running.
   


