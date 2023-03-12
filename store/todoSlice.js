import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState:{
        todo:[]
    },
    reducers: {
        setTodos: (state, action) => {
            console.log("set todo",state, action)
            state.todo = action.payload
        }
    }
})
export const {setTodos } = todoSlice.actions
export default todoSlice.reducer