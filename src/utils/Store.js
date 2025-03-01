import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from'./sideBarSlice'
import homePageSlice from './homePageSlice'
import searchBarSlice from './searchBarSlice'
import liveChatSlice from './liveChatSlice'
const store=configureStore({
    reducer:{
        sideBar:sideBarSlice,
        homePage:homePageSlice,
        searchBar:searchBarSlice,
        liveChat:liveChatSlice
    }
})
export default store