import React from 'react'

const RelatedVideos = ({video}) => {
    const {title,thumbnails,channelTitle,publishedAt}=video?.snippet
  return (
    <div className='flex w-[25rem] my-2 gap-2'>
      <img src={thumbnails?.high?.url} alt="" className='w-[11rem] h-[6rem] object-cover rounded-lg' />
      <div className='w-[40%]'>
      <p className='text-sm font-semibold'>{title.slice(0,40)+' ...'}</p>
      </div>
    </div>
  )
}

export default RelatedVideos