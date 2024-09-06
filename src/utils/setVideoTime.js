export default function setVideoTime(time) {
    const date = new Date();
    const nowUnixTime = Math.floor(date.getTime() / 1000);
    const videoUnixTime = Math.floor((Number(new Date(time)) / 1000));
    const afterUnixTime = nowUnixTime - videoUnixTime;

    if (afterUnixTime < 3600) {
        return `${parseInt(afterUnixTime / 60)}분 전`
    } else if (afterUnixTime < 86400) {
        return `${parseInt(afterUnixTime / 3600)}시간 전`
    } else if (afterUnixTime < 2592000) {
        return `${parseInt(afterUnixTime / 86400)}일 전`
    } else if (afterUnixTime < 31104000) {
        return `${parseInt(afterUnixTime / 2592000)}개월 전`
    } else {
        return `${parseInt(afterUnixTime / 31104000)}년 전`
    }
}