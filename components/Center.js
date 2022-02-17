import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { shuffle } from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistIdState, playlistState } from '../atom/playlistAtom'
import useSpotify from '../hooks/useSpotify'

import Songs from './Songs';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];

export default function Center() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    
    useEffect(() => {
       setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        if(status !== 'loading') {
            spotifyApi.getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data?.body)
            })
            .catch((err) => {
                console.log(err);
                signOut();
            })
            .finally( ()=> console.log('end'));
        }
    }, [spotifyApi, playlistId, setPlaylist, status]);

    console.log('playlist', playlist?.images?.[0]?.url);

    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <header onClick={signOut} className='flex items-center bg-black text-slate-50 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 absolute top-5 right-8'>
            {session?.user.image || !status ?
            <div className='w-10 h-10 rounded-full' >
                <Image 
                    width={400}
                    height={400}
                    layout='responsive'
                    objectFit='cover'
                    className='rounded-full'
                    src={session?.user.image} alt='user photo' />
            </div>
                 :
                <UserCircleIcon className='w-12 h-12 text-slate-400' />
            }
            <h2>{session?.user.name || null }</h2>
            <ChevronDownIcon className='w-5 h-5 text-slate-400' />
            </header>
            <section 
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                    {playlist?.images?.[0]?.url && (
                        <div className='h-44 w-44 shadow-2xl'>
                            <Image 
                                width={400}
                                height={400} 
                                layout='responsive' 
                                src={playlist?.images?.[0]?.url} 
                                alt='list image' 
                            />
                        </div>
                    )}
                    {playlist?.name && (
                        <div>
                        <p>PLAYLIST</p>
                        <h2 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
                            {playlist.name}
                        </h2>
                        </div>
                    )}
            </section>
            <section><Songs /></section>
        </div>
    )
}
