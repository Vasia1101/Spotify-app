import Head from 'next/head'
import Sidebar from '../components/SideBar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify copy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black h-screen overflow-hidden flex">
        <Sidebar />
        <Center />
      </main>
      {/* <div>
        Player block
      </div> */}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
