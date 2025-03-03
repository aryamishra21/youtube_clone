export const Video_URL='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key='+process.env.REACT_APP_API_KEY
export const LIVE_URL='https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=15&type=video&key='+process.env.REACT_APP_API_KEY
export const LIVE_STATS='https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,liveStreamingDetails&key='+process.env.REACT_APP_API_KEY
export const categoriesURL='https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key='+process.env.REACT_APP_API_KEY
export const categoryData='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=10&key='+process.env.REACT_APP_API_KEY
export const Video_Data='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key='+process.env.REACT_APP_API_KEY
export const Channel_Data='https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key='+process.env.REACT_APP_API_KEY
export const relatedVideosURL='https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&regionCode=IN&type=video&key='+process.env.REACT_APP_API_KEY
export const SearchURL='http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
export const SearchResultsURL='https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key='+process.env.REACT_APP_API_KEY
export const commentURL='https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&key='+process.env.REACT_APP_API_KEY
export const relatedVideoStat='https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key='+process.env.REACT_APP_API_KEY
export const LiveChatURL='https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&key='+process.env.REACT_APP_API_KEY
// +'&liveChatId=Cg0KC2YxSFFRUDltVUY4KicKGFVDSmc5d0JQeUtNTkE1c1JEbnZ6bWtkZxILZjFIUVFQOW1VRjg&pageToken=CBkQAA'


// get active live chat id and it to livechat urll to get chat
export const removeChatCount=200
export function convertNo(n) {
    const num = Number(n) || 0;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixIndex = 0;
    let formattedNumber = num;
    // Iterate while number is >= 1000 and we have suffixes left
    while (formattedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
        formattedNumber /= 1000;
        suffixIndex++;
    }
    // Format the number with 1 decimal place
    let result = formattedNumber.toFixed(1);
    // Remove .0 decimal if present
    if (result.endsWith('.0')) {
        result = result.slice(0, -2);
    }
    return result + suffixes[suffixIndex];
}

export function timeSince(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (let interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

export function generateId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }



// LiveChatURL=>
// {
//     "kind": "youtube#liveChatMessageListResponse",
//     "etag": "6-9etgz7_GIUef7yOwFN7gkCV0E",
//     "pollingIntervalMillis": 4966,
//     "pageInfo": {
//       "totalResults": 261,
//       "resultsPerPage": 261
//     },
//     "nextPageToken": "GIGsrc6c54sDIKGX6tGc54sD",
//     "items": [
//       {
//         "kind": "youtube#liveChatMessage",
//         "etag": "kPLcEGbuGTQ3rOqO7xHffc0TI6g",
//         "id": "LCC.EhwKGkNMN3F2X2FiNTRzREZma3UxZ0Fkb3VrclNB",
//         "snippet": {
//           "type": "textMessageEvent",
//           "liveChatId": "Cg0KC2YxSFFRUDltVUY4KicKGFVDSmc5d0JQeUtNTkE1c1JEbnZ6bWtkZxILZjFIUVFQOW1VRjg",
//           "authorChannelId": "UCsTPa0itY-DXLwf0ioT7Dtw",
//           "publishedAt": "2025-02-28T20:35:21.208241+00:00",
//           "hasDisplayContent": true,
//           "displayMessage": "I am very sad and angry that Donald Trump cant decipher lies from truth. It was painful to watch how Trump JD Vance where screaming like two gopniks in sports \"suits\".",
//           "textMessageDetails": {
//             "messageText": "I am very sad and angry that Donald Trump cant decipher lies from truth. It was painful to watch how Trump JD Vance where screaming like two gopniks in sports \"suits\"."
//           }
//         },
//         "authorDetails": {
//           "channelId": "UCsTPa0itY-DXLwf0ioT7Dtw",
//           "channelUrl": "http://www.youtube.com/channel/UCsTPa0itY-DXLwf0ioT7Dtw",
//           "displayName": "dains",
//           "profileImageUrl": "https://yt3.ggpht.com/ytc/AIdro_nAfgF6K5IdbfeVmXs2Tk7QJE9ncJXZNiVCvJyW0Ws=s88-c-k-c0x00ffffff-no-rj",
//           "isVerified": false,
//           "isChatOwner": false,
//           "isChatSponsor": false,
//           "isChatModerator": false
//         }
//       },
// }