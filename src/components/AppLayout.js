import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../utils/Store'
import { BiCategory } from 'react-icons/bi'
const AppLayout = () => {
  return (
    <Provider store={store}>
    <div>
        <Header/>
        <div className='flex '>
        <SideBar/>
        <Outlet/>
        </div>
    </div>
    </Provider>
  )
}


export default AppLayout
