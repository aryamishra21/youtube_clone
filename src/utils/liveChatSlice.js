import { createSlice } from "@reduxjs/toolkit";
import { removeChatCount } from "./constants";

const liveChatSlice=createSlice({
    name:'liveChatSlice',
    initialState:{
        liveChatData:[],
        nextPageOffset:null,
        liveChatCurrVideoId:null,
    },
    reducers:{
        addLiveChatData:(state,action)=>{
            // state.liveChatData.splice(removeChatCount,1)
            // state.liveChatData.unshift(...action.payload)


            state.liveChatData = [
                ...state.liveChatData,
                ...action.payload.filter(newItem => 
                    !state.liveChatData.some(existingItem => 
                        existingItem.id === newItem.id
                    )
                )
            ];
            // Keep only last 50 messages
            if(state.liveChatData.length > 300) {
                state.liveChatData = state.liveChatData.slice(-250);
            }
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