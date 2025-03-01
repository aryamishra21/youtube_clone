import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { closeSideBar } from "../utils/sideBarSlice";
import {
  Channel_Data,
  commentURL,
  convertNo,
  relatedVideosURL,
  timeSince,
  Video_Data,
} from "../utils/constants";
import CommentContainer from "../components/CommentContainer";
import { PiThumbsUp } from "react-icons/pi";
import RelatedVideos from "../components/RelatedVideos";
import LiveChat from "../components/LiveChat";
import { addLiveChatCurrVideoId } from "../utils/liveChatSlice";

const WatchPage = () => {
  // const location = useLocation();
  // const videoInfo = location.state || {};
  const [videoInfo,setVideo]=useState(null);
  const [videoId,setVideoId]=useState(null);
  // console.log(videoInfo, "state");
  const [channel, setChannelData] = useState(null);
  const [comments, setComments] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sideBarView=useSelector(store=>store.sideBar.isMenuOpen)
  useEffect(() => {
    dispatch(closeSideBar());
    videoData();
  }, [searchParams.get('v')]);
  useEffect(() => {
    if (videoInfo) {
      channelData();
      getComments();
      getRelatedVideos();
    }
  }, [videoInfo,searchParams.get('v')]);
  const videoData = async () => {
    console.log('vid')
    const response = await fetch(
      Video_Data + `&id=${searchParams.get("v")}`
    );
    const json = await response.json();
    console.log(json, "channel");
    dispatch(addLiveChatCurrVideoId(json?.items[0]?.id))
    // setVideoId(json?.items[0]?.id)
    setVideo(json?.items[0]);
  };
  const channelData = async () => {
    const response = await fetch(
      Channel_Data + `&id=${videoInfo?.snippet?.channelId}`
    );
    const json = await response.json();
    // console.log(json, "channel");
    setChannelData(json?.items[0]);
  };
  const getRelatedVideos = async () => {
    const response = await fetch(relatedVideosURL + "&relatedtovideoid=" + videoInfo.id);
    // const response=await fetch(Video_URL+'&videoCategoryId='+videoInfo?.snippet?.categoryId);
    const json = await response.json();
    // console.log(json?.items[1]?.snippet?.thumbnails?.default?.url?.split('/')[4], "related");
    setRelatedVideos(json?.items);
  };
  const getComments = async () => {
    const response = await fetch(commentURL + "&videoId=" + videoInfo.id);
    const json = await response.json();
    // console.log(json.items, "comments");
    setComments(json?.items);
  };
  return (
    <div className={"grid grid-cols-2 mt-4 grid-flow-col gap-10 " +(sideBarView?'ml-5':'mx-24')}>
      <div className="col-span-11 ">
        <iframe
          className="rounded-lg w-full h-[30rem]"
          src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        {/* ?autoplay=1 */}
        <p className="my-3 font-semibold text-xl">
          {videoInfo?.snippet?.title}
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <div className="size-[2.8rem] rounded-full bg-black ">
              <img
                src={channel?.snippet?.thumbnails?.high?.url}
                alt=""
                className="w-full h-full rounded-full "
              />
            </div>
            <div className="flex flex-col ">
              <p className="font-semibold">{channel?.snippet?.title}</p>
              <p className="text-[0.8rem] text-gray-700">
                {convertNo(channel?.statistics?.subscriberCount)} subscribers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 mr-5">
            <PiThumbsUp className="size-[1.3rem] my-1" />
            <p className="font-semibold">
              {convertNo(videoInfo?.statistics?.likeCount)}{" "}
            </p>
          </div>
        </div>
        <div
          className={
            " bg-gray-100 p-4 my-3 text-sm rounded-2xl relative cursor-pointer " +
            (showDescription
              ? "h-auto"
              : "h-[4.1rem] overflow-ellipsis overflow-hidden flex-wrap ")
          }
          onClick={() => setShowDescription(!showDescription)}
        >
          <div className="font-semibold flex gap-2 mb-2">
            <p>{convertNo(videoInfo?.statistics?.viewCount)} views</p>
            <p>{timeSince(new Date(videoInfo?.snippet.publishedAt))}</p>
          </div>
          <div className=" flex flex-wrap">
            {videoInfo?.snippet?.tags?.map((tag) => (
              <span className="mr-2">#{tag.replaceAll(/\s/g, "")}</span>
            ))}
          </div>
          <p className="mt-3 ">{videoInfo?.snippet?.description}</p>
          {/* <button>{!showDescription?<p className="right-10 absolute">more</p>:'less'}</button> */}
        </div>

        {/* comments  */}
        <div className="my-5">
          <p className="font-bold text-xl">
            {convertNo(videoInfo?.statistics?.commentCount) } Comments
          </p>
          <div>
            <CommentContainer commentData={comments} />
          </div>
        </div>
      </div>
      <div className="col-span-1 ">
        {/* {videoInfo?.snippet?.liveBroadcastContent=='live' && <LiveChat videoId={videoInfo?.id} nextPageToken={pageToken}/>} */}
        <LiveChat/>
        {relatedVideos?.map((video)=><Link to={{pathname:'/watch',search: `?v=${video?.snippet?.thumbnails?.default?.url?.split('/')[4]}` }} key={video?.snippet?.thumbnails?.default?.url?.split('/')[4]}><RelatedVideos video={video}/></Link>)}
      </div>
    </div>
  );  
};

export default WatchPage;
