import React, { useEffect } from 'react'
import { Video_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../utils/homePageSlice';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideosContainer = () => {
    const dispatch=useDispatch();
    const videos=useSelector(store=>store.homePage.videos)
    useEffect(()=>{
        getVideos();
    },[])
    const getVideos=async()=>{
        const response=await fetch(Video_URL)
        const json=await response.json();
        console.log(json,'data')
        dispatch(setVideos(json?.items))
    }
    if (!videos) return null
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 '>
        {videos.map((video)=><Link to={{pathname:'/watch',search: `?v=${video?.id}` }} state={video} key={video?.id}><VideoCard info={video}/></Link>)}
    </div>
  )
}

export default VideosContainer