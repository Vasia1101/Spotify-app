import { useSession } from 'next-auth/react'
import { UserIcon, ChevronDownIcon } from '@heroicons/react/outline'

export default function Center() {
    const { data: session} = useSession();
    console.log(session);
    return (
        <div className='flex-grow'>
            <h1 className='text-white'>Center</h1>
                
            <header>
            {session?.user.image ?
                <img className='w-10 h-10 rounded-full' src={session?.user.image} alt='user_photo' /> :
                <UserIcon className='w-10 h-10 rounded-fill text-slate-400' />
            }
            <ChevronDownIcon className='w-5 h-5 text-slate-400' />
            </header>
        </div>
    )
}
