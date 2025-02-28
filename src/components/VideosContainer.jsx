import React, { useEffect, useState } from 'react'
import { LIVE_STATS, Video_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { resetVideos, setVideos } from '../utils/homePageSlice';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideosContainer = () => {
  // console.log('vc')
    const dispatch=useDispatch();
    const videos=useSelector(store=>store.homePage.videos)
    const [videosId,setVideosId]=useState([]);
    useEffect(()=>{
      if(!videos){
        getVideos();
        console.log(videos?.[0]?.snippet?.liveBroadcastContent,'ls')
        if(videos?.[0]?.snippet?.liveBroadcastContent==='live' && videos?.[1]?.snippet?.liveBroadcastContent==='live' && videos?.[2]?.snippet?.liveBroadcastContent==='live' ){
          console.log('liv vid id1',videos.map((video)=>video?.id?.videoId))
          setVideosId(videos.map((video)=>video?.id?.videoId))
          getLiveVidDetails(videosId)
        }
      }
    },[])
    const getVideos=async()=>{
      // dispatch(resetVideos())
        console.log('here')
        const response=await fetch(Video_URL)
        const json=await response.json();
        // console.log(json,'data')
        dispatch(setVideos(json?.items))
    }
    const getLiveVidDetails=async(ids)=>{
      console.log('live vid id2 ',ids)
      const response=await fetch(LIVE_STATS+'&id='+ids.join(','))
      const json=await response.json();
      dispatch(setVideos(json?.items))
    }
    if (!videos) return null
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 '>
        {videos.map((video)=><Link to={{pathname:'/watch',search: `?v=${video?.id?.videoId?video?.id?.videoId:video?.id}` }} key={video?.id?.videoId?video?.id?.videoId:video?.id}><VideoCard info={video}/></Link>)}
    </div>
  )
}

export default VideosContainer

