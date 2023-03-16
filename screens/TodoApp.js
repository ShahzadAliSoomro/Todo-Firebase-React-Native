import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { firebase } from '@react-native-firebase/auth';
// import firebase from "@react-native-firebase-database";
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';
import TodoItem from '../component/InputEdit';
import Modal from "react-native-modal";



function WrapperComponent({ isVisible, toggleModal, todos, handleEdit, id,text, updateId, value, handleUpdate, isModalVisible }) {
  
  return (
    <View >
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1, backgroundColor: 'white', height: 400, width: 300 }}>
          <Text>I am the modal content!</Text>
          <TextInput 
           style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
          value={todos?.text}
          onChangeText={text => handleEdit(id, text)}
          // onChangeText={todoText => handleEdit(updateId, todoText, id, handleUpdate, isModalVisible)}
 
          />
          
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20,  }}>
          <TouchableOpacity 
          onPress={() => handleUpdate(updateId, todos?.text, id, handleUpdate, isModalVisible)}
          >
            <Text style={{
               backgroundColor: 'blue',
               borderRadius: 5,
               padding: 10,
               color: 'white',
            }}>Update</Text>
          </TouchableOpacity>
          <View style={{
             backgroundColor: 'red',
             borderRadius: 5,
             padding: 10,
             color: 'white',
          }}>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [title, setTitle] = useState("");
  const [newTodoText, setNewTodoText] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    
    setTodoText('');
  };

  const handleAddTodo = () => {
    if (todoText.length > 0) {
      setTodos([...todos, { id: Date.now().toString(), text: todoText }]);
      setTodoText('');
    }
  };

  const getdata = async () => {
    const todos = await firestore().collection('todos').get();
    const result = todos.docs.map(doc => {
      console.log("id", doc?.id);
      return { ...doc.data(), id: doc?.id }
    });
    setTodos(result);
    console.log("todos", result);
  }
  // useEffect(() => {
  //   getdata();
  // },[])
  useFocusEffect(useCallback(() => {
    console.log("useEffect");
    getdata();
  }, []))


  const handleDeleteTodo = async (id) => {
    console.log("id", id);
    firestore()
      .collection('todos')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  }

  const handleEdit = (id, value) => {
    setIsUpdate(true);
    setUpdateId(id);
    setTodoText(value);
    setModalVisible(true);
    

  }

  const handleUpdate = async () => {
    if (todoText.length > 0) {
      const todo = {
        todoText: todoText,
        id: updateId,
        todos: todos,
      }

      firestore().collection('todos')
        .doc(updateId)
        .update(todo)
        .then(() => {
          console.log('User updated!');
          setIsUpdate(false);
        })

    }
  }









  async function insertRecord() {
    const todoData = {
      title: title,
      todoText: todoText,
      completed: false,
      createdAt: firestore.FieldValue.serverTimestamp()

    };

    // Get a reference to the "todos" collection
    const todosCollection = firestore().collection('todos');

    // Add the data to a new document in the "todos" collection
    todosCollection.add(todoData)
      .then((docRef) => {

        setTodos([...todos, { id: Date.now().toString(), todoText: todoText }]);
        setTodoText('');

        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }



  return (
    <View style={styles.container}>
      <WrapperComponent isVisible={isModalVisible} handleUpdate={handleUpdate} id={updateId} text={todoText} handleEdit={handleEdit} toggleModal={toggleModal} />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todoText}
          onChangeText={setTodoText}

          placeholder="Add a task"
          placeholderTextColor="#aaa"
        />
      <TouchableOpacity style={styles.addButton} onPress={() => insertRecord(handleAddTodo)}>

            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
          
        

      </View>
      <View style={styles.listContainer}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.todoContainer}>
            <Text style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#aaa',
              borderRadius: 5,
              padding: 10,
              // marginRight: 1,
              fontSize: 14,
              color: '#333',
            }}>{todo?.todoText}</Text>

            <TouchableOpacity

              style={styles.deleteButton}
              onPress={() => handleEdit(todo.id, todo.todoText.toggleModal)}
              // onPress={() => handleEdit(todo.id, todo.todoText.toggleModal)}>
            >
              <Text style={styles.deleteButtonText}>Edit</Text>
            </TouchableOpacity>






            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTodo(todo.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>


        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
  }
})
