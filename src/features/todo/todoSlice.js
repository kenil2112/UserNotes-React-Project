import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{ id: 1, title: "Title", note: "Discription...", Radio: "a" }],
    SelectedOption: "All"
}

const ADDCARD = (state, action) => {
    const todo = {
        id: nanoid(),
        title: action.payload.title,
        note: action.payload.note,
        Radio: action.payload.Radio
    }
    state.todos.push(todo)
}

const DELETECARD = (state, action) => {
    state.todos = state.todos.filter((todo) => todo.id != action.payload)
}

const UPDATECARD = (state, action) => {
    state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.note = action.payload.note;
            todo.Radio = action.payload.Radio;
        }
    })
}

const SETSELECTEDOPTION = (state, action) => {
    state.SelectedOption = action.payload;
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addCard: ADDCARD,
        deleteCard: DELETECARD,
        updateCard: UPDATECARD,
        setSelectedOption: SETSELECTEDOPTION
    }
})

export const { addCard, deleteCard, updateCard, setSelectedOption } = todoSlice.actions

export default todoSlice.reducer