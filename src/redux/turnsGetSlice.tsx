import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../helper/api';
import { IFilter } from '../models/filterTurn';

const initialState = {
    data: []
}

export const fetchTurns = createAsyncThunk("fetchTurns", async (filterTurn:IFilter) => {
    var tzOffset=new Date().getTimezoneOffset()/(60);
    const response = await API.get('/turn/details/', { params:
        { machineId:filterTurn.machineId,studentId:filterTurn.studentId, date:filterTurn.date,pageNumber:filterTurn.pageNo }});

    response.data.item1.forEach((t: any) => {
        
        t.hour =(parseInt(t.date.split("T")[1].substring(0, 2)) -tzOffset) + ":00";
        t.date = t.date.split("T")[0];
    });
    return response.data;
})

const turnsGetSlice = createSlice({
    name: "turns",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTurns.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export default turnsGetSlice.reducer;