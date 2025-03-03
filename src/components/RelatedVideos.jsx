import React from 'react'
import { convertNo, timeSince } from '../utils/constants'

const RelatedVideos = ({video,views}) => {
    const {title,thumbnails,channelTitle,publishedAt}=video?.snippet
    // console.log(views,'views')
  return (
    <div className='flex w-full lg:w-[25rem] my-2 gap-2'>
      <img src={thumbnails?.high?.url} alt="" className='w-[50%] lg:w-[11rem] h-[7rem] sm:h-[12rem] lg:h-[6rem] object-cover rounded-lg' />
      <div className='w-[40%] sm:2-[50%]'>
      <p className='text-sm font-semibold'>{title.slice(0,40)+' ...'}</p>

      <p className='text-[0.8rem] font-semibold text-gray-600'>{channelTitle}</p>
      <p className='text-gray-500 text-[0.8rem]'>{convertNo(views)} Views {timeSince(new Date(publishedAt))}</p>
      {/* <p className='text-gray-500 font-semibold '>{convertNo(video.liveStreamingDetails? video?.liveStreamingDetails?.concurrentViewers: video?.statistics?.viewCount)}{ video.liveStreamingDetails? 'watching':'Views'} • {timeSince (new Date(publishedAt))}</p> */}
      {/* <p className='text-gray-500 font-semibold '>
          {convertNo(
            video?.liveStreamingDetails?.concurrentViewers || 
            video?.statistics?.viewCount
          )}
          {video?.liveStreamingDetails ? ' watching' : ' views'} • 
          {timeSince(new Date(publishedAt))}
        </p> */}
      </div>
    </div>
  )
}

export default RelatedVideos