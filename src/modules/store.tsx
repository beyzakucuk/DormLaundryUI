import {configureStore} from "@reduxjs/toolkit";
import turnsGetSlice from "../redux/turnsGetSlice";
import turnsFormSlice from "../redux/turnsFormSlice";
import turnFilterValuesSlice from "../redux/turnFilterValuesSlice";

export default configureStore({
    reducer:{
        turns:turnsGetSlice,
        turnFormType:turnsFormSlice,
        turnFilterValues: turnFilterValuesSlice,
    },
});