import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';

export default function VideoList() {
    const { search } = useParams();
    // console.log(search);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['main', search],
        queryFn: async () => {
            // const url = search ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&key=[key]` : '/data/videoList.json';
            const url = search ? '/data/searchList.json' : '/data/videoList.json';
            const res = await fetch(url);
            return await res.json();
        },
        refetchOnWindowFocus: false,
        staleTime: 900000,
    })

    if (isLoading) {
    } else if (isError) {
    } else {
        return (
            <main>
                <ul className='flex flex-wrap mx-[5px] py-[20px]'>
                    {
                        data.items.map((item) => {
                            const id = typeof item.id === 'string' ? item.id : item.id.videoId ? item.id.videoId : item.id.channelId;
                            const { channelTitle, channelId, publishedAt, thumbnails, title, description, tags } = item.snippet;
                            const channelInfo = {
                                channelTitle,
                                title,
                                id,
                                channelId,
                                publishedAt,
                                description,
                                tags,
                            }
                            const linkUrl = item.id.channelId ? '' : `/video/${id}`;

                            return (
                                <Link className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-[2.5px]" to={linkUrl} state={channelInfo} key={id}>
                                    <li className="text-white mb-[15px]">
                                        <img className="w-full mb-[10px]" src={thumbnails.medium.url} alt={title} />
                                        <p className="font-semibold text-sm mb-[5px] text-ellipsis line-clamp-2 break-all">{title}</p>
                                        <div className="text-[14px] text-xs mb-[3px] text-gray-300">{channelTitle}</div>
                                        <div className="text-[14px] text-xs text-gray-300">{setVideoTime(publishedAt)}</div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </main>
        );
    }
}

function setVideoTime(time) {
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