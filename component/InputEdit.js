// import React, { useState } from 'react';
// import { Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';

// const TodoItem = ({ item, handleDelete, handleEdit }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [todoText, setTodoText] = useState('');

//   const toggleModal = () => {
//     setTodoText(item.text);
//     setIsModalVisible(!isModalVisible);
//   };

//   return (
//     <View>
//       <Text>{item.text}</Text>
//       <TouchableOpacity onPress={handleDelete.bind(this, item.id)}>
//         <Text>Delete</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => handleEdit(item.id, item.text)}>
//         <Text>Edit</Text>
//       </TouchableOpacity>

//       <Modal visible={isModalVisible}>
//         <View>
//           <TextInput value={todoText} onChangeText={text => setTodoText(text)} />
//           <TouchableOpacity onPress={() => { handleUpdate(); toggleModal(); }}>
//             <Text>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={toggleModal}>
//             <Text>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };
// export default TodoItem;