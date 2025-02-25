import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesURL, Video_URL } from "../utils/constants";
import { setVideos } from "../utils/homePageSlice";


// const navOptions=['Shopping','Music','Movies','Live','Gaming','News','Sports','Courses','Fashion & Beauty','Podcasts']

const SideBar = () => {
    const [navOptions,setNavOptions]=useState('')
    const dispatch=useDispatch()
    useEffect(()=>{
        getNavOptions();
    },[])
    const getNavOptions=async()=>{
        const response=await fetch(categoriesURL);
        const json=await response?.json();
        setNavOptions(json)
    }
    const getCategoryData=async(id)=>{
        const response=await fetch(Video_URL+`&videoCategoryId=${id}`);
        // const response=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${id}&key=AIzaSyCLKgH7l7uz8-SEPzMBNjQpfXHyw81oENI`);
        const json=await response?.json();
        // console.log(json,'changed')
        dispatch(setVideos(json?.items))
    }
  const SideBarOpen = useSelector(store => store.sideBar.isMenuOpen);
  if(!SideBarOpen) return null;
  return (<div className="min-w-[15rem] mx-2 h-screen overflow-y-scroll">
    <p className="font-semibold p-4">Explore</p>
    <ul >
    {navOptions?.items?.map((option)=>{
        return <li key={option+option?.id} className='p-3 mx-1 hover:bg-gray-200 text-sm rounded-lg cursor-pointer' onClick={()=>getCategoryData(option?.id)}>{option?.snippet?.title}</li>
    })}
    </ul>
  </div>)
};

export default SideBar;
