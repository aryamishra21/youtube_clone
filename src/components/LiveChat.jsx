import React, { useEffect, useRef, useState } from "react";
import useLiveChat from "../hooks/useLiveChat";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/Store";
import { VscSend } from "react-icons/vsc";

import { addLiveChatData } from "../utils/liveChatSlice";
import { generateId } from "../utils/constants";


// fix views on videocontainer and relatedvideos

const LiveChat = () => {
  const { liveChatData, nextPageOffset, liveChatCurrVideoId } = useSelector(
    (store) => store.liveChat
  );
  const [yourMsg, setYourMsg] = useState("");
  const dispatch = useDispatch();
  const chatDivRef = useRef(null);
  useLiveChat();

  // console.log(liveChatData, "chatdata");
  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [liveChatData]);
  if (!liveChatCurrVideoId || !nextPageOffset) return;
  return (
    <div className="w-full h-[37rem] mb-5 rounded-2xl">
      <p className="px-4 py-3">Live Chat</p>
      <hr />

      {/* chat message */}
      <div
        className="w-full h-[84%]  overflow-y-scroll"
        ref={chatDivRef}
      >
        {liveChatData.map((chat) => {
          return (
            <div className="max-w-[25rem]" key={chat?.id}>
              <div className="p-2 flex justify-between ">
                <div className="w-[10%] flex justify-center">
                <img
                  src={chat?.authorDetails?.profileImageUrl}
                  alt="img"
                  className="size-[1.5rem] rounded-full "
                />
                </div>
                <div className="flex gap-3 w-[90%] text-[0.8rem] flex-wrap">
                  <p className="font-semibold text-gray-500">
                    {chat?.authorDetails?.displayName}
                  </p>
                  <p className="">
                    {chat?.snippet?.displayMessage }
                     {/* { chat?.snippet?.textMessageDetails?.messageText} */}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" w-full px-5">
        <form
          className="flex justify-between items-center w-full p-1 "
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addLiveChatData([
                {
                  id: generateId(30),
                  snippet: {
                    displayMessage: yourMsg,
                    textMessageDetails: {
                      messageText: yourMsg,
                    },
                  },
                  authorDetails: {
                    displayName: "User",
                    profileImageUrl:
                      "https://yt4.ggpht.com/Br9Jy_9fUDFL4luIKQ0yA1Jr1FhJvHK_n8LbAudSOW_5OVdASOgtp3lVUAKkNaFRzYRJGLMm=s32-c-k-c0x00ffffff-no-rj",
                  },
                },
              ])
            );
            setYourMsg('');
          }}
        >
          <input
            type="text"
            value={yourMsg}
            className="w-[90%] py-1 px-3 bg-gray-200 rounded-full"
            onChange={(e) => setYourMsg(e.target.value)}
          />
          <button>
            <VscSend className="size-[1.5rem]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;









// {
//   "kind": "youtube#liveChatMessage",
//   "etag": "TQIiTyBoj38KwkLIBgn5oA6Q4Fg",
//   "id": "LCC.EhwKGkNKVHZuNlh0NklzREZaS0o1UWNkejlzTHVn",
//   "snippet": {
//       "type": "textMessageEvent",
//       "liveChatId": "Cg0KC0t4RDFkeTRCaGdrKicKGFVDejhRYWlReEFwTHE4c0xOY3N6WXlKdxILS3hEMWR5NEJoZ2s",
//       "authorChannelId": "UCHKI2-x7kSQTz5plRfh-AXA",
//       "publishedAt": "2025-03-01T12:12:02.260319+00:00",
//       "hasDisplayContent": true,
//       "displayMessage": "yes...$2500",
//       "textMessageDetails": {
//           "messageText": "yes...$2500"
//       }
//   },
//   "authorDetails": {
//       "channelId": "UCHKI2-x7kSQTz5plRfh-AXA",
//       "channelUrl": "http://www.youtube.com/channel/UCHKI2-x7kSQTz5plRfh-AXA",
//       "displayName": "Christa Flores",
//       "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_mFwh2IrAgSRZ0bfsBI6zmAunMhdQdLYWio4gGzQHiQAgS8RJeBxykBSv3CKlCmqo2Z-A=s88-c-k-c0x00ffffff-no-rj",
//       "isVerified": false,
//       "isChatOwner": false,
//       "isChatSponsor": false,
//       "isChatModerator": false
//   }
// }

// useEffect(()=>{
//   let mes=setInterval(()=>{
//       dispatch(addLiveChatData({
//           name:generateName(),
//           message:generateMessage(20),
//       }))
//   },1500)
//   return ()=>clearInterval(mes)
// },[])
// var nameList = [
//   "Extreme",
//   "Multi",
//   "Universe",
//   "Ultimate",
//   "Death",
//   "Ready",
//   "Monkey",
//   "Elevator",
//   "Wrench",
//   "Grease",
//   "Head",
//   "Theme",
//   "Grand",
//   "Cool",
//   "Kid",
//   "Boy",
//   "Girl",
//   "Vortex",
//   "Paradox",
// ];
// export function generateName() {
//   var finalName = nameList[Math.floor(Math.random() * nameList.length)];
//   return finalName;
// }
// export function generateMessage(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//       }
//       return result;
// }

// <div className='overflow-y-scroll h-[26rem] flex flex-col-reverse'>
//   {liveChatData.map((message,i)=><ChatMessage name={message.name} message={message.message}/>)}
// </div>

// const ChatMessage = ({name,message}) => {
//   return (
//     <div className='flex  p-2 gap-2 shadow-sm items-center'>
//         <FaRegCircleUser className='size-[1.5rem] '/>
//         <div>
//             <p className='font-semibold'>{name}</p>
//             <p className='text-sm'>{message}</p>
//         </div>
//     </div>
//   )
// }
