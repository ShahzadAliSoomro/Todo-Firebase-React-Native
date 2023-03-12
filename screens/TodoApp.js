import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [title, setTitle] = useState("")

  const handleAddTodo = () => {
    if (todoText.length > 0) {
      setTodos([...todos, { id: Date.now().toString(), text: todoText }]);
      setTodoText('');
    }
  };

  // const handleDeleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  // added the updatedTodos function
  const updatedTodos = (id, updatedText) => {
    const newTodos = [...todos];
  
    // find index of the specific element we want to update
    const indexOfTodoToBeUpdated = newTodos.findIndex(todo => todo.id === id);
  
    // update the element
    newTodos[indexOfTodoToBeUpdated].text = updatedText;
  
    // set 'newTodos' to state
    setTodos(newTodos);
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


// async function fetchData() {
//   const collectionRef = firebase.firestore().collection('todos');
//   const querySnapshot = await collectionRef.get();
//   const documents = querySnapshot.docs;
//   documents.forEach((doc) => {
//     const data = doc.data();
//     console.log(data);
//   });
// }
// fetchData();

  return (
    <View style={styles.container}>
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
          <View key={todo.id.text} style={styles.todoContainer}>
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
            {/* <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => updatedTodos(todo.id)}
            >
              <Text style={styles.deleteButtonText}>Edit</Text>
            </TouchableOpacity> */}

             <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => updatedTodos(todo.id, todoText)}
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
 