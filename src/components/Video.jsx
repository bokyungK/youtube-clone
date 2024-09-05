import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Video() {
    const { state } = useLocation();
    const { channelTitle, title, id, channelId, description, tags } = state;

    // 채널 정보 호출
    const { data: channelData, error: channelError } = useQuery({
        queryKey: ['channel'],
        queryFn: async () => {
            // const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=[key]`;
            const url = '/data/channelList.json';
            const res = await fetch(url);
            return await res.json();
        },
        staleTime: 900000,
    })

    // 채널 영상 호출
    const { data: videoData, error: videoError } = useQuery({
        queryKey: ['video'],
        queryFn: async () => {
            // const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&channelId=${channelId}&order=date&type=video&key=[key]`;
            const url = '/data/channelVideoList.json';
            const res = await fetch(url);
            return await res.json();
        },
        staleTime: 900000,
    })

    if (channelData && videoData) {
        return (
            <div className='flex py-[20px] text-white max-[680px]:flex-col'>
                <section className='flex-1 mr-[10px] max-[768px]:flex-none max-[768px]:w-[483px] max-[680px]:w-full max-[680px]:mb-[15px]'>
                    <div className='w-full pb-[56.25%] relative mb-[15px]'>
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='mb-[15px] w-full h-full absolute'></iframe>
                    </div>
                    <div className='px-[15px]'>
                        <p className="font-bold break-all text-lg mb-[15px]">{title}</p>
                        <div className='mb-[15px] text-sm flex items-center'>
                            <img className='w-[30px] h-[30px] mr-[10px] rounded-full' src={channelData.items[0].snippet.thumbnails.default.url} alt="" />
                            <p className='text-lg'>{channelTitle}</p>
                        </div>
                        <ul className='break-all text-sm text-ellipsis line-clamp-3 text-zinc-300 mb-[10px]'>
                            {
                                tags && tags.map((txt) => {
                                    return <li className='mr-[5px] inline-block' key={txt}>#{txt}</li>
                                })
                            }
                        </ul>
                        <p className='text-sm break-all'>{description}</p>
                    </div>
                </section>
                <section className='w-[275px] max-[680px]:w-full max-[680px]:px-[15px]'>
                    <ul>
                        {
                            videoData.items.map((video) => {
                                const id = video.id.videoId;
                                const { thumbnails, publishTime, title, channelTitle, channelId, description } = video.snippet;
                                const channelInfo = {
                                    channelTitle,
                                    title,
                                    id,
                                    channelId,
                                    description,
                                    tags
                                }
                            
                                return (
                                    <Link to={`/video/${id}`} key={id} state={channelInfo}>
                                        <li className='flex mb-[5px]'>
                                            <img src={thumbnails.medium.url} alt="thumbnail image" className='w-[132.5px] mr-[10px] max-[680px]:w-[200px]'/>
                                            <div className='w-[50%]'>
                                                <p className='text-xs font-semibold mb-[5px] text-ellipsis line-clamp-2 break-all'>{title}</p>
                                                <div className='text-zinc-300'>
                                                    <p className='text-xs mb-[5px] line-clamp-1'>{channelTitle}</p>
                                                    <p className='text-xs line-clamp-1'>{setVideoTime(publishTime)}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </section>
            </div>
        );
    } else if (channelError && videoError) {
        return  (
            <div className='text-white my-[20px]'>일시적인 페이지 오류가 발생했습니다.</div>
        )
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
