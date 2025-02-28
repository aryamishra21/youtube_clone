import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from'./sideBarSlice'
import homePageSlice from './homePageSlice'
import searchBarSlice from './searchBarSlice'
const store=configureStore({
    reducer:{
        sideBar:sideBarSlice,
        homePage:homePageSlice,
        searchBar:searchBarSlice
    }
})
export default store