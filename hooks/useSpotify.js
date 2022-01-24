import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SECRET,
});

export default function useSpotify() {
    const { data: session, status} = useSession();

    useEffect(() => {
        console.log("status", status);
        if (session) {
            session.error === 'RefresToken' && signIn();

            spotifyApi.setAccessToken(session?.user?.accessToken);
        }
    }, [session]);

    return spotifyApi;
};
