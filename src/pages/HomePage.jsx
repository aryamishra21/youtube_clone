import React from 'react'
import VideosContainer from '../components/VideosContainer'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const sideBarView=useSelector(store=>store.sideBar.isMenuOpen)
  return (
    <div className={"mx-auto px-3 xl:w-[85%] mt-28 lg:w-[95%] "+(sideBarView?'xl:ml-[18%]':'') } >
      <VideosContainer/>
    </div>
  )
}

export default HomePage