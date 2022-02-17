import React, { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import Image from 'next/image'

import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '../atom/songAtom'
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon, 
    RewindIcon, 
    SwitchHorizontalIcon, 
    VolumeUpIcon,
 } from '@heroicons/react/solid'
import { debounce } from 'lodash'

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
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spotifyApi, currentTrackId, data]);
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    };

    const debonuceVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch(err => {});
        }, 500), []
    );

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debonuceVolume(volume)
        };
    }, [volume, debonuceVolume])



    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
           {/* Left  */}
           <div className="flex items-center space-x-4">
            {srcImage?.length > 0 && (
                    <div className='hidden md:inline h-10 w-10'>
                        <Image 
                            src={srcImage}
                            width={400}
                            height={400} 
                            layout='responsive' 
                            alt='song image'
                        />
                    </div>
            )}
            {songIngo?.name &&(
                    <div>
                        <h3>{songIngo.name}</h3>
                        <p>{songIngo?.artists?.[0]?.name}</p>

                    </div>
            )}
           </div>
           <div className="flex items-center justify-evenly">
               <SwitchHorizontalIcon className="button" />
               <RewindIcon className="button" />
               {isPlaying ? (
                   <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" /> 
                   ) : (
                   <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" /> 
                )}
                <FastForwardIcon className="button" />
                <ReplyIcon className="button" />
           </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon 
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button" 
                />
                    <input
                        className="w-14 md:w-28"
                        onChange={e => setVolume(Number(e.target.value))}
                        type="range" 
                        value={volume} 
                        min={0} 
                        max={100} 
                    />
                <VolumeUpIcon 
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button" 
                />
            </div>
        </div>
    )
}
