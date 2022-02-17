import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atom/playlistAtom'
import Song from './Song'


export default function Songs() {
    const playlist = useRecoilValue(playlistState);
    const { items } = playlist?.tracks || {};
    return (
        <div className='px-8 flex flex-col space-y-1 pb-28 text-slate-100'>
            {items?.length > 0 && items?.map(({track}, i) => (<Song key={track.id} track={track} order={i} />))}
        </div>
    )
}
