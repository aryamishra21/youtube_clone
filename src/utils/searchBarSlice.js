import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice=createSlice({
    name:'searchBarSlice',
    initialState:{
        sugg:{},
        query:null,
    },
    reducers:{
        addSearchSugg:(state,action)=>{
            // console.log(action.payload, 'action')
            Object.assign(state.sugg,action.payload)
        },
        addSearchQuery:(state,action)=>{
            state.query=action.payload
        }
    }
})
export const {addSearchSugg,addSearchQuery}=searchBarSlice.actions;
export default searchBarSlice.reducer;