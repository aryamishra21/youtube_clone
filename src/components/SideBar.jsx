import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesURL, LIVE_URL, Video_URL } from "../utils/constants";
import { resetVideos, setVideos } from "../utils/homePageSlice";
import { useNavigate } from "react-router-dom";
import { addNextPageOffset } from "../utils/liveChatSlice";


// const navOptions=['Shopping','Music','Movies','Live','Gaming','News','Sports','Courses','Fashion & Beauty','Podcasts']

const SideBar = () => {
    const [navOptions,setNavOptions]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        getNavOptions();
    },[])
    const getNavOptions=async()=>{
        const response=await fetch(categoriesURL);
        const json=await response?.json();
        setNavOptions(json)
    }
    const getCategoryData=async(id)=>{
        dispatch(resetVideos())
        const response=await fetch(Video_URL+`&videoCategoryId=${id}`);
        const json=await response?.json();
        // console.log(json,'changed')
        dispatch(setVideos(json?.items))
        navigate('/')
    }
    const getLiveData=async()=>{
        dispatch(resetVideos())
        const response=await fetch(LIVE_URL);
        const json=await response?.json();
        // console.log(json,'changed')
        dispatch(addNextPageOffset(json?.nextPageToken))
        dispatch(setVideos(json?.items))
        navigate('/')
    }
  const SideBarOpen = useSelector(store => store.sideBar.isMenuOpen);
  if(!SideBarOpen) return null;
  return (<div className="min-w-[15rem] mx-2 h-screen overflow-y-scroll">
    <p className="font-semibold p-4">Explore</p>
    <ul >
    <li key='live' className='p-3 mx-1 hover:bg-gray-200 text-sm rounded-lg cursor-pointer' onClick={()=>getLiveData()}>Live</li>
    {navOptions?.items?.map((option)=>{
        return <li key={option+option?.id} className='p-3 mx-1 hover:bg-gray-200 text-sm rounded-lg cursor-pointer' onClick={()=>getCategoryData(option?.id)}>{option?.snippet?.title}</li>
    })}
    </ul>
  </div>)
};

export default SideBar;
