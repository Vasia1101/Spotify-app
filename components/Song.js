import React from 'react'
import Image from 'next/image'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atom/songAtom'

export default function Song({
    order, 
    track,
}) {
    const { album, name, artists, duration_ms, id, uri } = track || {};
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const playSong = () => {
        console.log(uri);
        setCurrentTrackId(id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [uri],
        })
    };
    
    const srcImage = album?.images[0]?.url || '';

    return (
        <ul className='list-none grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
           <li className='flex items-center space-x-4'>
               <p>{order+1}</p>
               {srcImage?.length > 0 && (
                <div className='h-10 w-10'>
                    <Image 
                        src={srcImage}
                        width={400}
                        height={400} 
                        layout='responsive' 
                        alt='song image'
                    />
                </div>
               )}
               <div>
                   <p className='w-36 lg:w-64 text-white truncate'>{name}</p>
                   <p className='w-40'>{artists[0]?.name}</p>
               </div>
            </li>
            <li className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='hidden md:inline w-40'>{album?.name}</p>
                <p>{millisToMinutesAndSeconds(duration_ms)}</p>
            </li> 
        </ul>
    )
}
