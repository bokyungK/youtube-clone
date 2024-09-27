import React from 'react';
import setVideoTime from '../utils/setVideoTime';
import he from 'he';

export default function VideoCard({ video, type }) {
    const { thumbnails, title, channelTitle, publishTime } = video;

    return (
        <li className={`flex ${type ? 'flex-col mb-[15px]' : 'mb-[5px]'}`}>
            <img src={thumbnails.high.url} alt="thumbnail image" className={`${type ? 'w-full mb-[10px]' : 'mr-[10px] w-[132.5px] xs:w-[200px] md:w-[132.5px]'}`} />
            <div className={`text-white ${type ? 'w-full' : 'w-[50%] flex-1'}`}>
                <p className={`mb-[5px] font-semibold text-ellipsis line-clamp-2 break-all text-sm ${type && 'w-full text-sm mb-[5px]'}`}>{he.decode(title)}</p>
                <div className='text-zinc-300'>
                    <p className={`text-xs line-clamp-1 mb-[${type ? '5' : '3'}px]`}>{channelTitle}</p>
                    <p className='text-xs line-clamp-1'>{setVideoTime(publishTime)}</p>
                </div>
            </div>
        </li>
    );
}

