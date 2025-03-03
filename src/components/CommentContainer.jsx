import React, { useState } from 'react'
import { timeSince } from '../utils/constants'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { PiThumbsUp } from "react-icons/pi";

const Comment=({comment})=>{
    return(
        <div className='flex gap-5 my-3 pr-3 shadow-sm text-wrap overflow-hidden '>
            {comment?.snippet?.authorProfileImageUrl ?
                <img src={comment?.snippet?.authorProfileImageUrl} className='size-[3rem] rounded-full' alt='user'/>
             :<div className='size-[3rem] rounded-full bg-blue-500 flex items-center'><span>A</span></div>}
            <div className='text-sm'>
                <div className='flex gap-2'>
            <p className='text-sm font-semibold my-1  '>{comment?.snippet?.authorDisplayName}</p>
            <p className='text-[0.8rem] my-1'>{timeSince(new Date(comment?.snippet?.publishedAt))}</p>
                </div>
            <p className=''>
             {comment?.snippet?.textOriginal}
            </p>
            <div className='flex items-center gap-1'>
            <PiThumbsUp className='size-[1.3rem] my-1'/>
            {comment?.snippet?.likeCount}
            </div>
            </div>
        </div>
    )
}
const CommentList=({comments})=>{
    const [showReplies,setShowReplies]=useState(false);
    // console.log('comm',comments)
    return (
        <div>
        {comments?.map((comment)=>{
            return(
                <div className='my-5 ' key={comment?.id}>
                    <Comment comment={comment?.snippet?.topLevelComment} />
                    {
                        comment?.replies &&                     
                        <div className='ml-10'>
                            <div className='flex items-center gap-1 hover:bg-blue-200 w-fit px-3 py-1 cursor-pointer text-blue-700 rounded-full text-sm font-semibold' onClick={()=>setShowReplies(!showReplies)}>
                                {showReplies?<IoIosArrowUp/>:<IoIosArrowDown/>}
                                <p>{comment?.snippet?.totalReplyCount} replies</p>
                            </div>
                            {
                               showReplies &&  comment?.replies?.comments?.map((comment)=> <Comment comment={comment}/>)
                            }
                        </div>
                    }

                </div>
            )
        })}
        </div>
    )
}

const CommentContainer = ({commentData}) => {
    // console.log(commentData,'comment Data')
  return (
    <div className='w-full '>
        <CommentList comments={commentData}/>
    </div>
  )
}

export default CommentContainer

// {
//     "kind": "youtube#commentThread",
//     "etag": "SPgObC6fxOJL6UvtppqCL23VdLU",
//     "id": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//     "snippet": {
//         "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//         "videoId": "Px-nmrgl7Hs",
//         "topLevelComment": {
//             "kind": "youtube#comment",
//             "etag": "otBZy7G7heFFFzU_Z42A6GiHoJo",
//             "id": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//             "snippet": {
//                 "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                 "videoId": "Px-nmrgl7Hs",
//                 "textDisplay": "Apply Radar Study Abroad Consultants<br>Save 40% on Foreign Degree through twinning programs<br>WhatsApp - +60126677449 <br>Website - <a href=\"https://applyradar.com/\">https://applyradar.com</a>",
//                 "textOriginal": "Apply Radar Study Abroad Consultants\nSave 40% on Foreign Degree through twinning programs\nWhatsApp - +60126677449 \nWebsite - https://applyradar.com",
//                 "authorDisplayName": "@TamilTalkies",
//                 "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_m0g0eeXjFOkCtbKd-hlCzUopLhfI_GSjVZqcoutYsfPH0=s48-c-k-c0x00ffffff-no-rj",
//                 "authorChannelUrl": "http://www.youtube.com/@TamilTalkies",
//                 "authorChannelId": {
//                     "value": "UCkI-SYGC8fxPNcp6FsX4SRQ"
//                 },
//                 "canRate": true,
//                 "viewerRating": "none",
//                 "likeCount": 169,
//                 "publishedAt": "2025-02-22T00:15:39Z",
//                 "updatedAt": "2025-02-22T00:15:39Z"
//             }
//         },
//         "canReply": true,
//         "totalReplyCount": 6,
//         "isPublic": true
//     },
//     "replies": {
//         "comments": [
//             {
//                 "kind": "youtube#comment",
//                 "etag": "wBPTaJjevtc4yXMhqPyAuESnIOA",
//                 "id": "Ugy8L6WAMZrQulzKPRR4AaABAg.AEpCQF6FwKVAEpU9ecL98b",
//                 "snippet": {
//                     "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                     "videoId": "Px-nmrgl7Hs",
//                     "textDisplay": "Sir ennoda friend satchi permal oru padam pannirukan tentkotta ott la release agi irukku pls ada parthu review sollunga",
//                     "textOriginal": "Sir ennoda friend satchi permal oru padam pannirukan tentkotta ott la release agi irukku pls ada parthu review sollunga",
//                     "parentId": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//                     "authorDisplayName": "@Kudigarapunnagai-lu7op",
//                     "authorProfileImageUrl": "https://yt3.ggpht.com/89LYRpeF8G8FJ_nfWP7mqky7S80uWXVvrMLkfqzXm_betKg2x9NpYUpgh91fDTJSte9DnYt_=s48-c-k-c0x00ffffff-no-rj",
//                     "authorChannelUrl": "http://www.youtube.com/@Kudigarapunnagai-lu7op",
//                     "authorChannelId": {
//                         "value": "UCxhkuglNJ17Nn_RVcIFdHRQ"
//                     },
//                     "canRate": true,
//                     "viewerRating": "none",
//                     "likeCount": 14,
//                     "publishedAt": "2025-02-22T02:50:40Z",
//                     "updatedAt": "2025-02-22T02:50:40Z"
//                 }
//             },
//             {
//                 "kind": "youtube#comment",
//                 "etag": "rztploYjLPUrZNBaGHm0uY8M1VI",
//                 "id": "Ugy8L6WAMZrQulzKPRR4AaABAg.AEpCQF6FwKVAEqFHTIrwzF",
//                 "snippet": {
//                     "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                     "videoId": "Px-nmrgl7Hs",
//                     "textDisplay": "🎉",
//                     "textOriginal": "🎉",
//                     "parentId": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//                     "authorDisplayName": "@kiranp9091",
//                     "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nh2ENrqQ548kQO8wjs5bpNei7NwIYYowWIVZhIobWsOKE=s48-c-k-c0x00ffffff-no-rj",
//                     "authorChannelUrl": "http://www.youtube.com/@kiranp9091",
//                     "authorChannelId": {
//                         "value": "UCV7WSr8lde9u70rbdXYUq6A"
//                     },
//                     "canRate": true,
//                     "viewerRating": "none",
//                     "likeCount": 3,
//                     "publishedAt": "2025-02-22T09:59:54Z",
//                     "updatedAt": "2025-02-22T09:59:54Z"
//                 }
//             },
//             {
//                 "kind": "youtube#comment",
//                 "etag": "aR1y18JUciijg8pidlFiWi9u6AU",
//                 "id": "Ugy8L6WAMZrQulzKPRR4AaABAg.AEpCQF6FwKVAEr7hemTyfQ",
//                 "snippet": {
//                     "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                     "videoId": "Px-nmrgl7Hs",
//                     "textDisplay": "விபச்சார கூட்டத்துக்கு தலைவி தமிழ் சீரியல் நடிகை David mercy leyal.",
//                     "textOriginal": "விபச்சார கூட்டத்துக்கு தலைவி தமிழ் சீரியல் நடிகை David mercy leyal.",
//                     "parentId": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//                     "authorDisplayName": "@Sikkamamafans22",
//                     "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_kRdiwgGASa43GPYT-c3Z6MApteJOGOBXuLd7u6TpOt2CJm9iQ6p6u16RMmQYwe-Tke3g=s48-c-k-c0x00ffffff-no-rj",
//                     "authorChannelUrl": "http://www.youtube.com/@Sikkamamafans22",
//                     "authorChannelId": {
//                         "value": "UCd9awUWizDP8EKFDDItychw"
//                     },
//                     "canRate": true,
//                     "viewerRating": "none",
//                     "likeCount": 0,
//                     "publishedAt": "2025-02-22T18:12:57Z",
//                     "updatedAt": "2025-02-22T18:12:57Z"
//                 }
//             },
//             {
//                 "kind": "youtube#comment",
//                 "etag": "SFnJ6TwTDmdxp053siVplvucg9M",
//                 "id": "Ugy8L6WAMZrQulzKPRR4AaABAg.AEpCQF6FwKVAErVMZBzImO",
//                 "snippet": {
//                     "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                     "videoId": "Px-nmrgl7Hs",
//                     "textDisplay": "<a href=\"https://www.youtube.com/watch?v=Px-nmrgl7Hs&amp;t=71\">1:11</a> <a href=\"https://www.youtube.com/watch?v=Px-nmrgl7Hs&amp;t=72\">1:12</a>",
//                     "textOriginal": "1:11 1:12",
//                     "parentId": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//                     "authorDisplayName": "@ไสวกมลพันธ์-ฆ8จ",
//                     "authorProfileImageUrl": "https://yt3.ggpht.com/n4nURjg9d0AqWy6htpQRzDqnjPpEpfjpziDXl4b9HxkoZ1M9oB3vp4KKXOmdCWxSEM5H51fc=s48-c-k-c0x00ffffff-no-rj",
//                     "authorChannelUrl": "http://www.youtube.com/@%E0%B9%84%E0%B8%AA%E0%B8%A7%E0%B8%81%E0%B8%A1%E0%B8%A5%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C-%E0%B8%868%E0%B8%88",
//                     "authorChannelId": {
//                         "value": "UC5LR9RmMU88qQiOtAOPPIJA"
//                     },
//                     "canRate": true,
//                     "viewerRating": "none",
//                     "likeCount": 0,
//                     "publishedAt": "2025-02-22T21:39:39Z",
//                     "updatedAt": "2025-02-22T21:39:39Z"
//                 }
//             },
//             {
//                 "kind": "youtube#comment",
//                 "etag": "D9M-WQc8tj8_DAhv-vQ8WD3bmLI",
//                 "id": "Ugy8L6WAMZrQulzKPRR4AaABAg.AEpCQF6FwKVAErVPa_2Yli",
//                 "snippet": {
//                     "channelId": "UCkI-SYGC8fxPNcp6FsX4SRQ",
//                     "videoId": "Px-nmrgl7Hs",
//                     "textDisplay": "พากันคุยกันไนนี้ติไล😊",
//                     "textOriginal": "พากันคุยกันไนนี้ติไล😊",
//                     "parentId": "Ugy8L6WAMZrQulzKPRR4AaABAg",
//                     "authorDisplayName": "@ไสวกมลพันธ์-ฆ8จ",
//                     "authorProfileImageUrl": "https://yt3.ggpht.com/n4nURjg9d0AqWy6htpQRzDqnjPpEpfjpziDXl4b9HxkoZ1M9oB3vp4KKXOmdCWxSEM5H51fc=s48-c-k-c0x00ffffff-no-rj",
//                     "authorChannelUrl": "http://www.youtube.com/@%E0%B9%84%E0%B8%AA%E0%B8%A7%E0%B8%81%E0%B8%A1%E0%B8%A5%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C-%E0%B8%868%E0%B8%88",
//                     "authorChannelId": {
//                         "value": "UC5LR9RmMU88qQiOtAOPPIJA"
//                     },
//                     "canRate": true,
//                     "viewerRating": "none",
//                     "likeCount": 0,
//                     "publishedAt": "2025-02-22T21:40:04Z",
//                     "updatedAt": "2025-02-22T21:40:04Z"
//                 }
//             }
//         ]
//     }
// }