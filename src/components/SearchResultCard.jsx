import React, { useEffect, useState } from 'react'
import { convertNo, timeSince, Video_Data } from '../utils/constants'

const SearchResultCard = ({info}) => {
  console.log('info',info)
  const[video,setVideo]=useState('')
  const {snippet}=info
    useEffect(()=>{
                getMovieViews();
  },[info?.id?.videoId])
const getMovieViews=async()=>{
    if (!info?.id?.videoId) return
    console.log(Video_Data + `&id=${info?.id?.videoId}`,'url')
        const response = await fetch(
            Video_Data + `&id=${info?.id?.videoId}`
        );
        const json = await response.json();
        setVideo(json?.items[0]);
        // console.log(json , 'views')
    }

  return (
    <div  className='flex  gap-5 my-10 cursor-pointer w-[80vw] mx-auto' >
        <div className='w-[40%] h-[18rem]'>
        <img src={snippet.thumbnails.high.url} className='rounded-lg size-full object-cover' />
        </div>
        <div className='text-[0.8rem] w-[60%]'>
            <p className='text-lg my-1'>{snippet.title}</p>
            <p className='text-gray-500 font-semibold '>{convertNo(video?.statistics?.viewCount)} Views • {timeSince (new Date(snippet.publishedAt))}</p>
            <div className='mt-2 mb-4'>
            {/* <img src='' alt="" /> */}
            <p className='text-gray-600 my-2 font-bold text-sm'>{snippet.channelTitle}</p>
            </div>
            <p className='w-[80%] text-gray-700 text-sm'>{video?.snippet?.description.slice(0,100)}</p>
        </div>
    </div>
  )
}

export default SearchResultCard