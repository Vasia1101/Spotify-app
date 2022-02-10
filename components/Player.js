import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import Image from 'next/image'

import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '../atom/songAtom'

export default function Player() {
    const spotifyApi = useSpotify();
    const {data, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);


    const songIngo = useSongInfo();

    const srcImage = songIngo?.album?.images?.[0]?.url || ''

    
    const fetchCurrentSong = () => {
        if(!songIngo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log('play now', data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spotifyApi, currentTrackId, data])
    return (
        <div className=''>
           {/* Left  */}
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
        </div>
    )
}
