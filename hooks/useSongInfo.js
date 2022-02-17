import { useState, useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { currentTrackIdState } from '../atom/songAtom'
import { useRecoilState } from 'recoil'

export default function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongIngo = async () => {
            if(currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());
                setSongInfo(trackInfo);
            }
        };

        fetchSongIngo();

    }, [currentTrackId, spotifyApi]);

    return songInfo;
}
