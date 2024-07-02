# HobbyLog
- yet another hobby tracker project for Orbital
- https://docs.google.com/document/d/1kn6f5DI_kcPe4xdSFbr5MbLerr5grkbVOMUIGb4VkJY/edit?usp=sharing
## About this project
“If you can get 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.”  When trying to pick up a new skill, learn a new language, or simply build a habit, consistency is key. Amidst the myriad of tasks, to-dos, and tedium of everyday life, working on our hobbies can often feel discouraging and difficult. Furthermore, when trying to learn, the overload of information online from varying sources, makes it difficult to even know where to start. HobbyLog addresses this need by providing a structured and enjoyable platform that not only helps organise and monitor our hobbies but also celebrates our milestones in a supportive community. 

## Features
- **User Authentication:** -  Register and login to your own profile. (Implemented)
- **Progress Tracking** - The core feature of the application is the ability to create and customise hobbies, with achievement levels that track one’s progress in a hobby. (Planned)
- **Goal Setting** - Set short term and long term goals, as well as weekly/monthly tasks. Set reminders for them and catalog your progress by uploading images. (Planned)
- **Achievements** - Earn EXP and Achivements as you develop your skills. They don't do anything (and most likely will never), but they're (probably) pretty! (Planned)
- **Shareable hobby templates** - Export and import hobby templates created by other users, allowing you to easily customise and adapt the hobby trackers of others for personal use. (Planned)
- **Community features** - The ability to search for other user’s profiles, hobbies, and their progress. (Planned)
- **Co-op mode** - Allow users to work on the same hobby together, allowing them to track the progress of others and the goals that they have completed. (Planned)

## Testing Conducted 

Multivariable Testing: To ensure the robustness and reliability of HobbyLog, we conducted extensive multivariable testing. This involved changing different variables within the app and observing the effects to ensure that all functionalities worked as expected. For instance, we modified user input parameters such as goal deadlines, reminder frequencies, and hobby types to see how the system responded. By systematically varying these parameters, we were able to identify and fix issues related to data handling, user interface updates, and notification scheduling. This approach helped us verify that the application could handle a wide range of user scenarios and preferences without any loss of functionality or performance.

Unit Testing: Unit testing was a crucial part of our development process to ensure the reliability of individual components within HobbyLog. We wrote comprehensive unit tests for all the critical functions and methods in our codebase. Using testing frameworks such as Jest and Mocha, we isolated each unit of code to test its behaviour independently from the rest of the system. This enabled us to detect and resolve issues early in the development cycle, ensuring that each unit performed correctly under various conditions. By maintaining a high coverage of unit tests, we ensured that the foundational building blocks of our application were solid and dependable.

Integration Testing: Integration testing was conducted to ensure that the different modules of HobbyLog worked together seamlessly. After verifying the individual components through unit testing, we focused on testing the interactions between these components. We simulated real-world scenarios where multiple modules would interact, such as a user setting a new hobby goal, receiving a reminder notification, and then updating their progress. By creating and running these integration tests, we were able to identify and address issues that only arose when components were combined, ensuring that the entire system functioned cohesively.

API Testing: API testing was performed using Postman to validate the correctness, performance, and reliability of our backend services. We created a comprehensive suite of tests for all our API endpoints, covering various request methods, parameters, and payloads. These tests ensured that the API responded correctly to valid requests, handled errors gracefully, and maintained performance standards under load. By automating these tests and running them regularly, we could quickly detect and fix any regressions or issues that arose due to changes in the backend code. This rigorous API testing process ensured that our frontend and mobile clients could reliably communicate with the backend services.

User Testing: User testing was conducted to gather feedback from actual users and improve the usability and functionality of HobbyLog. Through observation and direct feedback sessions, we gathered valuable insights into how users perceived and used the app. This feedback highlighted areas of the application that needed refinement, such as user interface design, navigation flow, and feature intuitiveness. By incorporating this feedback into our development process, we were able to make iterative improvements that significantly enhanced the overall user experience.
By conducting these thorough and systematic testing processes, we ensured that HobbyLog was not only functional and reliable but also user-friendly and robust, ready to provide a seamless experience to its users.

## SWE Practices
Agile Development: Allow for flexible and iterative development, encouraging frequent assessment and adaptation of processes.

Code Reviews: Regular code reviews to maintain code quality.

Version Control with Git: Protect the main branch with strict rules, develop new features in separate branches, regularly commit and push changes, and merge through pull requests after peer reviews.
## Tech Stack
- **React-native:** For front-end development. Written in **JavaScript/TypeScript**.
- **ExpressJS:** For back-end development, used to build a RESTful API with **NodeJS**.
- **MongoDB:** Database used for storing (seemingly) important stuff.

## Completed in Milestone 1 and 2:
Start Page: Upon loading hobbylog, the user will be greeted with the start page. Following this, they will choose to sign in or create an account. 

Homepage: Upon successful login, the user will be directed to the homepage, in which they are able to clearly see the amount of tasks left for them to complete for each hobby through the percentage bar and list showing the 2-3 earliest deadlines to meet. 
User Profile Page: Users can easily customize their profiles by uploading a profile image, entering their username, hobbies, and a brief bio. After filling in these details on the user profile page, they can click the "Upload Profile" button to save their information. The entered data, including the profile image, will be uploaded to our MongoDB database, ensuring that each user's personalized profile is securely stored and can be accessed and modified at any time. This seamless process allows users to maintain an updated and personalized presence within the app.

Hobbies Page: 
On the Hobby page, users can fully engage with their favourite activities by setting specific goals and recurring tasks, for which they can also set reminders to recur weekly/bi-weekly/monthly. Users can keep track of their progress and milestones by uploading photos to their Hobby Album, creating a visual diary of their journey. As they achieve their goals, they can earn badges that serve as motivational rewards. Additionally, users can document their experiences and reflections in the Journal section, making it easy to track their growth and maintain a personal record of their hobbies.

## Looking Forward
Community Search: Allows users to search for hobbies made by other users in a community page.

Community Feedback: Allows users to like and comment on hobbies on the community page.

Co-op hobbies: Page for users to log hobby progress together with others

## Want to try?
### If you want to run this locally: Note: You need to have NodeJS installed.
### This repository contains two folders: 'express', the expressJS server, and 'HobbyLog', the react-native app.
1. clone the repository with ```git clone https://github.com/NCTOrbital24/hobbylog.git ```
2. Install dependencies:
   
   a. (If you intend to run the server locally) Go to ./express ```cd ./express ``` and run ```npm install``` to install all the dependencies. Start the server with ```node npm run start```
   
   b. Go to ./HobbyLog ```cd ../HobbyLog ``` (assuming you did step a) and run ```npm install``` to install all the dependencies
3. **Note:** The server may be up and running, which in that case, just skip to step 4. You can check if the server is running by opening [this webpage](domain=prepared-perch-dashing.ngrok-free.app). If it says 'OK', the server is running.

   If the server is not running, you may choose to run the server on your local machine. This is where things may start to get 𝓯𝓻𝓮𝓪𝓴𝔂. Change **backendLink** in ```./HobbyLog/app/src/constants/constants.js``` to the server's address (by default, localhost:3001).
   
   **It's important to note that emulators may not be able to reach localhost ports. In that case, you will have to forward the port your server is running on.**
4. Run the app with ```npx expo start```
5. If this didn't work for you please let me know

### STANDALONE APK FOR ANDROID ###
Link for Milestone 1 [here](https://expo.dev/artifacts/eas/eoW1bB4KwggwFciyaKo89o.apk)

Just download it on your device/emulator and open it. Note this requires the server to be up and running.



