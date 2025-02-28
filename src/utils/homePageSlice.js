import { createSlice } from "@reduxjs/toolkit";

const homePageSlice=createSlice({
    name:'homePageSlice',
    initialState:{
        videos:null
    },
    reducers:{
        setVideos:(state,action)=>{
            state.videos=action.payload
        },
        resetVideos:(state)=>{
            state.videos=null
        }
    }
    
})
export const {setVideos,resetVideos}=homePageSlice.actions
export default homePageSlice.reducer;