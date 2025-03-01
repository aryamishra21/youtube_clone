import React from 'react'
import { convertNo, timeSince } from '../utils/constants'

const RelatedVideos = ({video}) => {
    const {title,thumbnails,channelTitle,publishedAt}=video?.snippet
  return (
    <div className='flex w-[25rem] my-2 gap-2'>
      <img src={thumbnails?.high?.url} alt="" className='w-[11rem] h-[6rem] object-cover rounded-lg' />
      <div className='w-[40%]'>
      <p className='text-sm font-semibold'>{title.slice(0,40)+' ...'}</p>

      <p className='text-sm text-gray-600'>{channelTitle}</p>
      <p className='text-gray-500 font-semibold '>{convertNo(video.liveStreamingDetails? video?.liveStreamingDetails?.concurrentViewers: video?.statistics?.viewCount)}{ video.liveStreamingDetails? 'watching':'Views'} • {timeSince (new Date(publishedAt))}</p>
      </div>
    </div>
  )
}

export default RelatedVideos