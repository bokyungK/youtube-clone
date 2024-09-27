import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import axios from 'axios';

export default function VideoList() {
    const { search } = useParams();
    const { data: videoData, isError } = useQuery({
        queryKey: ['main', search],
        queryFn: async () => {
            const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&type=episode&order=date&${search ? `q=${search}` : ''}&regionCode=KR&key=${process.env.REACT_APP_API_KEY}`;
            return axios.get(url, { onDownloadProgress: (e) => {
                console.log(e);
            }}).then(res => res.data.items);
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })

    return (
        <main>
            <ul className='flex flex-wrap mx-[5px] py-[20px]'>
                {
                    videoData && videoData.map((item) => {
                        const id = item.id.videoId || item.id.playlistId;
                        const { channelTitle, channelId, publishedAt, title, description, tags } = item.snippet;
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
