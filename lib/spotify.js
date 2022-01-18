import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-follow-read',
  'user-read-playback-state',
  'user-modify-payback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
].join(',');

const params = {
    scope: scopes,
};

const queryPararmString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryPararmString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };