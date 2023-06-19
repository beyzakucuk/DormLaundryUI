import { createSlice } from "@reduxjs/toolkit";
import { IFilter } from "../models/filterTurn";

var filtervalues: IFilter = {
    machineId: 0,
    studentId: "",
    date: new Date(),
    pageNo:0
}; 

const initialState = {
    data: filtervalues,
    loading: false,
    error: "",
}

const turnFilterValuesSlice = createSlice({
    name:"turnFilterValues",
    initialState: {
        value: initialState,
    },
    reducers:{
        setFilterValue: (state, action)=>{
            state.value = action.payload;
        },
    },
});

export const {setFilterValue} = turnFilterValuesSlice.actions;

export default turnFilterValuesSlice.reducer;