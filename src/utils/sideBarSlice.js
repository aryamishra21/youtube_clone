import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice=createSlice({
    name:'sideBar',
    initialState:{
        isMenuOpen:true
    },
    reducers:{
        flipSideBar:(state)=>{
            state.isMenuOpen=!state.isMenuOpen
        },
        closeSideBar:(state)=>{
            state.isMenuOpen=false
        }
    }
})
export const {flipSideBar,closeSideBar}=sideBarSlice.actions
export default sideBarSlice.reducer;