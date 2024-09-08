import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Channel({ channelTitle, channelId }) {
    const { data: videoData } = useQuery({
        queryKey: ['channel'],
        queryFn: async () => {
            // const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=[key]`;
            const url = '/data/channelList.json';
            return axios.get(url).then(res => res.data.items[0])
        },
        staleTime: 900000,
    })

    return (
        <div className='mb-[15px] text-sm flex items-center'>
            {
                videoData && <img className='w-[30px] h-[30px] mr-[10px] rounded-full' src={videoData.snippet.thumbnails.medium.url} alt="video thumbnail" />
            }
            <p className='text-lg'>{channelTitle}</p>
        </div>
    )
}

