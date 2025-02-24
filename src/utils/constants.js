const API_KEY='AIzaSyCLKgH7l7uz8-SEPzMBNjQpfXHyw81oENI'
export const Video_URL='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key='+API_KEY
export const categoriesURL='https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key='+API_KEY
export const categoryData='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=10&key=AIzaSyCLKgH7l7uz8-SEPzMBNjQpfXHyw81oENI'
export const Video_Data='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key='+API_KEY
export const Channel_Data='https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key='+API_KEY
export const relatedVideosURL='https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&regionCode=IN&key='+API_KEY
// &type=video for shorts
// &relatedtovideoid=5roiw_xy-kc for related video
export const commentURL='https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&key='+API_KEY

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