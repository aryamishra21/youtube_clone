import { createSlice } from "@reduxjs/toolkit";

const homePageSlice=createSlice({
    name:'homePageSlice',
    initialState:{
        videos:[]
    },
    reducers:{
        setVideos:(state,action)=>{
            state.videos=action.payload
        }
    }
    
})
export const {setVideos}=homePageSlice.actions
export default homePageSlice.reducer;