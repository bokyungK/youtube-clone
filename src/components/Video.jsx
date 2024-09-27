import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Channel from './Channel';
import VideoCard from './VideoCard';
import axios from 'axios';
import he from 'he';

export default function Video() {
    const { state } = useLocation();
    const { channelTitle, title, id, channelId, description, tags } = state;
    const { data: videoData, error: videoError } = useQuery({
        queryKey: ['video'],
        queryFn: async () => {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&channelId=${channelId}&order=date&type=video&key=${process.env.REACT_APP_API_KEY}`;
            return axios.get(url).then(res => res.data.items)
        },
        staleTime: 900000,
    })

    return (
        <div className='flex py-[20px] text-white flex-col md:flex-row'>
            <section className='w-full mb-[15px] md:w-[674px] lg:flex-1'>
                <div className='w-full pb-[56.25%] relative mb-[15px]'>
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='mb-[15px] w-full h-full absolute'></iframe>
                </div>
                <div className='px-[15px]'>
                    <p className="font-bold break-all text-lg mb-[15px]">{he.decode(title)}</p>                    
                    <Channel channelTitle={channelTitle} channelId={channelId} />
                    <ul className='break-all text-sm text-ellipsis line-clamp-3 text-zinc-300 mb-[10px]'>
                        {
                            tags && tags.map((txt) => {
                                return <li className='mr-[5px] inline-block' key={txt}>#{he.decode(txt)}</li>
                            })
                        }
                    </ul>
                    <pre className='text-sm break-all whitespace-pre-wrap'>{description}</pre>
                </div>
            </section>
            <section className='w-full px-[15px] md:flex-1 lg:flex-none lg:w-[350px]'>
                <ul>
                    {
                        videoData && videoData.map((video) => {
                            const id = video.id.videoId;
                        
                            return (
                                <Link to={`/video/${id}`} key={id} state={{...video.snippet, id}}>
                                    <VideoCard video={video.snippet} />
                                </Link>
                            )
                        })
                    }
                    {
                        videoError && <div className='text-white'>관련 영상을 불러오는데 일시적인 오류가 발생했습니다.</div>
                    }
                </ul>
            </section>
        </div>
    );
}
