import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify copy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Vasyl Haida app</h1>
      <main className="bg-black h-screen overflow-hidden">
        <Sidebar />
        Center Block
      </main>
      <div>
        Player block
      </div>
    </div>
  )
}
