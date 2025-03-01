import React, { useEffect, useState } from 'react'
import { LIVE_STATS, LiveChatURL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addLiveChatData } from '../utils/liveChatSlice'

const useLiveChat = () => {
    const {nextPageOffset,liveChatCurrVideoId} = useSelector((store) => store.liveChat);
    const dispatch=useDispatch()
    const [liveChatId,setLiveChatId]=useState(null)
    const [nextPageToken,setNextPageToken]=useState(nextPageOffset);
    useEffect(()=>{
        getActiveLiveChatId();
        // setNextPageToken(nextPageOffset)
    },[liveChatCurrVideoId])
    const getActiveLiveChatId=async()=>{
        const response=await fetch(LIVE_STATS+'&id='+liveChatCurrVideoId)
        const json=await response.json()
        console.log('live chatid ',json)
        setLiveChatId(json?.items?.[0]?.liveStreamingDetails?.activeLiveChatId)
    }
    useEffect(()=>{
        const timer=setInterval(async() => {
        getLiveChat()
        }, 5000); 
        return ()=>clearInterval(timer)
    },[liveChatId])
    const getLiveChat=async()=>{
        console.log(liveChatId,'liv chat id',nextPageOffset)
        if(liveChatId && nextPageToken){
            console.log(nextPageToken,'npt')
                const response=await fetch(LiveChatURL+'&liveChatId='+liveChatId+'&pageToken='+nextPageToken)
                const json=await response.json()
                console.log(json,'resp token')
                setNextPageToken(json.nextPageToken)

                dispatch(addLiveChatData(json?.items));
        }
    }
  return 
}

export default useLiveChat