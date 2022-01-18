import React from 'react';
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react';

export default function login({
    providers,
}) {
    console.log(providers);
    return (
        <div className='flex flex-col bg-black min-h-screen w-full justify-center items-center'>
            <Image 
            width={150}
            height={150}
            src='https://links.papareact.com/9xl' 
            alt='logo' 
            />
            {
                Object?.values(providers)?.map(({name, id}) => (
                    <div key={name}>
                        <button 
                        className='bg-[#18D860] text-white p-5 rounded-full mt-5' 
                        onClick={() => signIn(id, {callbackUrl: '/'})}
                        >
                            Login with {name}
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}