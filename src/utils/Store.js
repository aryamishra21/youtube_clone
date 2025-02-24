import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from'./sideBarSlice'
import homePageSlice from './homePageSlice'
const store=configureStore({
    reducer:{
        sideBar:sideBarSlice,
        homePage:homePageSlice
    }
})
export default store