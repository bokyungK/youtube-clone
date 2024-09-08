import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import axios from 'axios';

export default function VideoList() {
    const { search } = useParams();
    const { data: videoData, isLoading, isError } = useQuery({
        queryKey: ['main', search],
        queryFn: async () => {
            // const url = search ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&key=[key]` : '/data/videoList.json';
            const url = search ? '/data/searchList.json' : '/data/videoList.json';
            return axios.get(url).then(res => res.data.items);
        },
        refetchOnWindowFocus: false,
        staleTime: 900000,
    })

    return (
        <main>
            <ul className='flex flex-wrap mx-[5px] py-[20px]'>
                {
                    videoData && videoData.map((item) => {
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
                                <VideoCard video={{...item.snippet, publishTime: publishedAt}} type='col' />
                            </Link>
                        )
                    })
                }
                { isError && <div className='text-white pl-[10px]'>일시적인 에러가 발생했습니다.</div> }
            </ul>
        </main>
    );
}
