import { createSlice } from "@reduxjs/toolkit";

let apiLinkSlice=createSlice({
    name:'apiLink',
    initialState:{
        // link:'http://localhost:5000'
        link:'https://e-learning-data.vercel.app'
    },
    reducers:{
    }
})

export let apiLinkReducer=apiLinkSlice.reducer;
