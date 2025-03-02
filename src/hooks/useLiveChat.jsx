import React, { useEffect, useRef, useState } from 'react'
import { LIVE_STATS, LiveChatURL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addLiveChatData, addNextPageOffset } from '../utils/liveChatSlice'

// const useLiveChat = () => {
//     const {nextPageOffset,liveChatCurrVideoId} = useSelector((store) => store.liveChat);
//     const dispatch=useDispatch()
//     const [liveChatId,setLiveChatId]=useState(null)
//     // const [nextPageToken,setNextPageToken]=useState(nextPageOffset);
//     useEffect(()=>{
//         if(liveChatCurrVideoId){
//             getActiveLiveChatId();
//         }
//         // setNextPageToken(nextPageOffset)
//     },[liveChatCurrVideoId])
//     const getActiveLiveChatId=async()=>{
//         const response=await fetch(LIVE_STATS+'&id='+liveChatCurrVideoId)
//         const json=await response.json()
//         console.log('live chatid ',json)
//         setLiveChatId(json?.items?.[0]?.liveStreamingDetails?.activeLiveChatId)
//     }
//     useEffect(()=>{
//         if(liveChatId){
//             const timer=setInterval(async() => {
//             getLiveChat()
//             }, 5000); 
//             return ()=>clearInterval(timer)
//         }
//     },[liveChatId])
//     const getLiveChat=async()=>{
//         console.log(liveChatId,'liv chat id',nextPageOffset)
//         if(liveChatId && nextPageOffset){
//             console.log(nextPageOffset,'npt')
//                 const response=await fetch(LiveChatURL+'&liveChatId='+liveChatId+'&pageToken='+nextPageOffset)
//                 const json=await response.json()
//                 console.log(json,'resp token')
//                 dispatch(addNextPageOffset(json.nextPageToken));
//                 dispatch(addLiveChatData(json?.items));
//         }
//     }
//   return 
// }

// export default useLiveChat



// In useLiveChat.js
const useLiveChat = () => {
    const {nextPageOffset, liveChatCurrVideoId} = useSelector((store) => store.liveChat);
    const dispatch = useDispatch();
    const [liveChatId, setLiveChatId] = useState(null);
    const nextPageRef = useRef(nextPageOffset);

    // Keep ref updated with latest page token
    useEffect(() => {
        nextPageRef.current = nextPageOffset;
    }, [nextPageOffset]);

    useEffect(() => {
        if (liveChatCurrVideoId) {
            getActiveLiveChatId();
        }
    }, [liveChatCurrVideoId]);

    const getActiveLiveChatId = async () => {
        const response = await fetch(LIVE_STATS + '&id=' + liveChatCurrVideoId);
        const json = await response.json();
        setLiveChatId(json?.items?.[0]?.liveStreamingDetails?.activeLiveChatId);
    };

    useEffect(() => {
        let timer;
        if (liveChatId) {
            const fetchData = async () => {
                try {
                    const currentPageToken = nextPageRef.current;
                    const response = await fetch(
                        LiveChatURL + 
                        '&liveChatId=' + liveChatId + 
                        '&pageToken=' + (currentPageToken || '')
                    );
                    const json = await response.json();
                    
                    if(json.items?.length > 0) {
                        dispatch(addNextPageOffset(json.nextPageToken));
                        dispatch(addLiveChatData(json.items));
                    }
                } catch (error) {
                    console.error('Error fetching live chat:', error);
                }
            };

            // Initial immediate fetch
            fetchData();
            
            // Set up periodic polling
            timer = setInterval(fetchData, 5000);
        }
        return () => clearInterval(timer);
    }, [liveChatId]); // Only depend on liveChatId

    return null;
};
export default useLiveChat