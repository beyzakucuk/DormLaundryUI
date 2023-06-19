import { createSlice } from "@reduxjs/toolkit";

export const turnFormSlice = createSlice({
    name:"turnFormType",
    initialState: {
        value: 0,
    },
    reducers:{
        filterFormOn: state=>{
            state.value = 0;
        },
        addFormOn: state=>{
            state.value = 1;
        },
    },
});

export const {filterFormOn, addFormOn} = turnFormSlice.actions;

export default turnFormSlice.reducer;
