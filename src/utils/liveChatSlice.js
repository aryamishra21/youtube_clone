import { createSlice } from "@reduxjs/toolkit";
import { removeChatCount } from "./constants";

const liveChatSlice=createSlice({
    name:'liveChatSlice',
    initialState:{
        liveChatData:[],
        nextPageOffset:null,
        liveChatCurrVideoId:null
    },
    reducers:{
        addLiveChatData:(state,action)=>{
            state.liveChatData.splice(removeChatCount,1)
            // state.liveChatData.unshift(...action.payload)
            state.liveChatData.unshift(action.payload)
        },
        addNextPageOffset:(state,action)=>{
            state.nextPageOffset=action.payload
        },
        addLiveChatCurrVideoId:(state,action)=>{
            state.liveChatCurrVideoId=action.payload
        }
    }
})
export const {addLiveChatData,addNextPageOffset,addLiveChatCurrVideoId}= liveChatSlice.actions;
export default liveChatSlice.reducer;