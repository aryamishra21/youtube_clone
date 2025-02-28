import React, { useEffect } from 'react'
import { convertNo, timeSince } from '../utils/constants';

const VideoCard = ({info}) => {
  // console.log(info?.snippet?.liveBroadcastContent,'vid')
  const {snippet}=info;
  const{title, channelTitle}=snippet;
  // useEffect(()=>{
  //   if()
  // },[])
  // const{viewCount}=statistics;
  return (
    <div className='cursor-pointer max-w-[28rem] '>
        <div className='h-[14rem]'>
            <img src={snippet?.thumbnails?.maxres?.url || snippet?.thumbnails?.medium?.url} alt="" className='rounded-lg w-full h-full object-fill'/>
        </div>
      <p className='font-semibold'>{title}</p>
      <p className='text-sm text-gray-600'>{channelTitle}</p>
      <p className='text-sm text-gray-700'>{convertNo(info.liveStreamingDetails? info.liveStreamingDetails.concurrentViewers: info.statistics?.viewCount)}  • {timeSince(new Date(snippet?.publishedAt))}</p>
    </div>
  )
}

export default VideoCard