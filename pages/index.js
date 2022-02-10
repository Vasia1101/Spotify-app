import React, { Fragment } from 'react'
import Helmet from '../components/Helmet'
import Sidebar from '../components/SideBar'
import Center from '../components/Center'
import Player from '../components/Player'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <Fragment>
      <Helmet />
        <main className="bg-black h-screen overflow-hidden flex">
        <Sidebar />
        <Center />
      </main>
      <div className='sticky h-24 bg-gradient-to-b from-black to-gray-900 bottom-0'>
        <Player />
      </div>
    </Fragment>
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
