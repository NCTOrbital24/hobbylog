import React, { useState } from "react";
import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   ImageBackground,
   TouchableOpacity,
   TextInput,
   Button,
   FlatList,
   Image,
} from "react-native";
import { useRouter } from "expo-router";
import Background from "@/assets/images/defaultBackground.png";
import * as ImagePicker from 'expo-image-picker';
import AddGoalModal from "@/components/HobbyCreation/AddGoalModal";
import AddTaskModal from "@/components/HobbyCreation/AddTaskModal";
import { AntDesign } from '@expo/vector-icons';
import sortGoalsByDeadline from "@/functions/sortGoalsByDeadline";




import { backendLink } from "@/constants/constants";


export default function CreateHobbyScreen() {
   const createLink = backendLink + "/api/hobby/create";
   const router = useRouter();
   const [goals, setGoals] = useState([]);
   const [tasks, setTasks] = useState([]);
   const [journals, setJournals] = useState([]);
   const [newJournal, setNewJournal] = useState("");
   const [journalModal, showJournalModal] = useState(false);
   const [goalModalGoal, setGoalModalGoal] = useState();
   const [taskModalTask, setTaskModalTask] = useState();
   const [goalModal, showGoalModal] = useState(false);
   const [taskModal, showTaskModal] = useState(false);
   const [image, setImage] = useState(null);


   const closeGoalModal = () => {
       setGoalModalGoal(undefined);
       showGoalModal(false);
   };


   const closeTaskModal = () => {
       setTaskModalTask(undefined);
       showTaskModal(false);
   };


   const [newGoal, setNewGoal] = useState({
       name: "",
       description: "",
       deadline: new Date(),
       completed: false,
       exp: 0,
   });
   const [newTask, setNewTask] = useState({
       name: "",
       description: "",
       frequency: "",
       time: -1,
       day: -1,
       month: -1,
   });
   const [hobby, setHobby] = useState({
       name: "",
       description: "",
       goals: [],
       tasks: [],
   });

   const pickImage = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.Images,
           allowsEditing: true,
           aspect: [1, 1],
           quality: 1,
       });


       if (!result.cancelled) {
           setImage(result.uri);
       }
   };


   const handleSubmitHobby = async () => {
       const newGoals = sortGoalsByDeadline(goals);
       const data = {
           hobbyName: hobby.name,
           hobbyDescription: hobby.description,
           goals: newGoals,
           tasks: tasks,
           profilePic: image,
       };


       try {
           const response = await fetch(createLink, {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
           });


           if (!response.ok) {
               throw new Error("Failed to add hobby");
           }


           setHobby({
               name: "",
               description: "",
               goals: [],
               tasks: [],
           });
           setGoals([]);
           setTasks([]);


       } catch (error) {
           console.error("Error adding hobby:", error);
       } finally {
           router.navigate("HomeScreen");
       }
   };


   const addGoal = () => {
       if (newGoal.name !== "") {
           const updatedGoals = [...goals, newGoal];
           setGoals(updatedGoals);
           setNewGoal({
               name: "",
               description: "",
               deadline: new Date(),
               completed: false,
               exp: 0,
           });
           handleInputChange("goals", updatedGoals);
       }
   };


   const addTask = () => {
       if (newTask.name !== "") {
           const updatedTasks = [...tasks, newTask];
           setTasks(updatedTasks);
           setNewTask({
               name: "",
               description: "",
               frequency: "",
               time: -1,
               day: -1,
               month: -1,
           });
           handleInputChange("tasks", updatedTasks);
       }
   };


   const handleInputChange = (name, value) => {
       setHobby((prevHobby) => ({
           ...prevHobby,
           [name]: value,
       }));
   };


   const addJournal = () => {
       if (newJournal !== "") {
           const updatedJournals = [...journals, newJournal];
           setJournals(updatedJournals);
           setNewJournal("");
       }
   };
  
   const navigateToAddJournal = () => {
       showJournalModal(true);
   };
  


   const navigateToAddGoal = (index) => {
       const selectedGoal = goals[index];
       setGoalModalGoal(selectedGoal);
       showGoalModal(true);
   };


   const navigateToAddTask = (index) => {
       const selectedTask = tasks[index];
       setTaskModalTask(selectedTask);
       showTaskModal(true);
   };


   return (
       <ImageBackground source={Background} style={styles.background}>
           <View style={styles.root}>


           <View style={styles.profilePicContainer}>
                   <TouchableOpacity onPress={pickImage}>
                       <Image
                           source={image ? { uri: image } : require("@/assets/images/placeholder.png")}
                           style={styles.profilePic}
                       />
                       <Text style={styles.editImageText}>Edit Hobby Image</Text>
                   </TouchableOpacity>
               </View>


               <View style={styles.box}>
                   <TextInput
                       textAlign="center"
                       style={styles.input}
                       placeholder="Give your hobby a name"
                       value={hobby.name}
                       onChangeText={(text) => handleInputChange("name", text)}
                   />
               </View>
               <View style={styles.box}>
                   <TextInput
                       textAlign="center"
                       style={styles.input}
                       placeholder="Write some words about your hobby"
                       value={hobby.description}
                       onChangeText={(text) =>
                           handleInputChange("description", text)
                       }
                   />
               </View>
               <View style={styles.listContainer}>
                   <Text
                       style={{
                           fontSize: 15,
                           marginBottom: 4,
                           fontWeight: "bold",
                       }}
                   >
                       Goals:
                   </Text>
                   {goals.length > 0 ? (
                       <FlatList
                           style={styles.list}
                           data={goals}
                           renderItem={({ item, index }) => (
                               <TouchableOpacity
                                   onPress={() => navigateToAddGoal(index)}
                               >
                                   <View style={styles.card}>
                                       <Text
                                           style={{
                                               fontSize: 18,
                                               marginBottom: 1,
                                           }}
                                       >
                                           •{" " + item.name}
                                       </Text>
                                       <Text>{item.description}</Text>
                                       <Text>
                                           Deadline:{" "}
                                           {item.deadline.toLocaleDateString()}
                                       </Text>
                                   </View>
                               </TouchableOpacity>
                           )}
                           keyExtractor={(item, index) => index.toString()}
                       />
                   ) : (
                       <Text style={{ color: "grey" }}>
                           No goals yet. Add a new goal!
                       </Text>
                   )}
                   <TouchableOpacity
                       style={styles.goalButton}
                       onPress={() => {
                           setGoalModalGoal(undefined);
                           showGoalModal(true);
                       }}
                   >
                       <AntDesign name="pluscircle" size={20} color="black" />
                   </TouchableOpacity>
               </View>


               <View style={styles.listContainer}>
                   <Text
                       style={{
                           fontSize: 15,
                           marginBottom: 4,
                           fontWeight: "bold",
                       }}
                   >
                       Tasks:
                   </Text>
                   {tasks.length > 0 ? (
                       <FlatList
                           style={styles.list}
                           data={tasks}
                           renderItem={({ item, index }) => (
                               <TouchableOpacity
                                   onPress={() => navigateToAddTask(index)}
                               >
                                   <View
                                       style={{
                                           marginBottom: 10,
                                           padding: 10,
                                           backgroundColor: "#F2E6FF",
                                           borderRadius: 5,
                                       }}
                                   >
                                       <Text
                                           style={{
                                               fontSize: 18,
                                               marginBottom: 5,
                                           }}
                                       >
                                           •{" " + item.name}
                                       </Text>
                                       <Text>{item.description}</Text>
                                       <Text>Frequency: {item.frequency}</Text>
                                   </View>
                               </TouchableOpacity>
                           )}
                           keyExtractor={(item, index) => index.toString()}
                       />
                   ) : (
                    
                       <Text>No tasks yet. Add a new task!</Text>
                   )}
                                   <TouchableOpacity
                   style={styles.goalButton}
                   onPress={() => {
                       setTaskModalTask(undefined);
                       showTaskModal(true);
                   }}
               >
                   <AntDesign name="pluscircle" size={20} color="black" />
               </TouchableOpacity>
              
               </View>


               <TouchableOpacity style={styles.submitButton} onPress={handleSubmitHobby}>
                   <Text style={styles.submitText}>(っ◔◡◔)っ ♥ Submit! ♥</Text>
                   </TouchableOpacity>
           </View>
           <AddGoalModal
               visible={goalModal}
               closeModal={closeGoalModal}
               goal={goalModalGoal}
               goals={goals}
               setGoals={setGoals}
           />
           <AddTaskModal
               visible={taskModal}
               closeModal={closeTaskModal}
               task={taskModalTask}
               tasks={tasks}
               setTasks={setTasks}
           />

<View style={styles.listContainer} backgroundColor="#fffdd0">
  <Text style={{ fontSize: 15, marginBottom: 4, fontWeight: "bold" }}>Journals:</Text>
  {journals.length > 0 ? (
    <FlatList
      style={styles.list}
      data={journals}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={{ fontSize: 18, marginBottom: 1 }}>
            {/* Wrap the bullet point in the Text component */}
            <Text>• </Text>
            {item.text}
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  ) : (
    <Text style={{ color: "grey" }}>No journal entries yet. Add a new entry!</Text>
  )}
  <TouchableOpacity style={styles.goalButton} onPress={navigateToAddJournal}>
    <AntDesign name="pluscircle" size={20} color="black" />
  </TouchableOpacity>
</View>


       </ImageBackground>
   );
}


const styles = StyleSheet.create({


   profilePicContainer: {
       alignItems: 'center',
       marginVertical: 20,
   },
   profilePic: {
       width: 120,
       height: 120,
       borderRadius: 60,
       borderWidth: 3,
       borderColor: 'white',
   },
   editImageText: {
       color: '#333',
       fontSize: 15,
       marginTop: 8,
       fontWeight: 'bold',
   },
   scrollview: {
       width: "100%",
       height: "100%",
   },
   background: {
       resizeMode: "cover",
       justifyContent: "center",
       alignItems: "center",
       paddingTop: "15%",
   },
   root: {
       width: "100%",
       height: "100%",
       padding: "7%",
       alignItems: "center",
   },
   header: {
       width: "100%",
       height: "10%",
       marginTop: 20,
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
       paddingLeft: 20,
       paddingRight: 20,
   },
   input: {
       fontSize: 16,
       color: "black",
   },
   icon: {
       height: "50%",
       width: "50%",
   },
   headerText: {
       fontSize: 36,
   },
   headerIcon: {
       height: 15,
       width: 15,
   },
   goalButton: {
       marginTop: 8,
       marginBottom: 6,
       justifyContent: "center",
       alignItems: "center",
   },
   list: {},
   listContainer: {
       width: "100%",
       backgroundColor: "#fffdd0",
       paddingTop: 8,
       paddingLeft: 17,
       paddingRight: 15,
       paddingBottom: 5,
       borderRadius: 15,
       marginBottom: 8,
       maxHeight: "40%",
   },
   card: {
       backgroundColor: "#ffd1dc",
       color: "#141414",
       borderRadius: 8,
       paddingHorizontal: 8,
       paddingVertical: 5,
       marginBottom: 7,
   },
   submitButton: {
       marginTop: 10,
       paddingVertical: 13,
       paddingHorizontal: 18,
       borderRadius: 8,
       backgroundColor: "#F9BEE7",
   },
   submitText: {
       fontSize: 20,
       color: "black",
       fontWeight: "bold",
   }
});
