'use client'

import {Session} from "next-auth";
import {signIn} from "next-auth/react";
import Image from "next/image";

export default function Nav({user}:Session){
    return (
        <nav className='flex justify-between items-center'>
            <h1>some navigation</h1>
            <ul>
                {!user && (
                    <li className={'bg-teal-600 text-white py-8 px-4 rounded-md'}>
                        <button onClick={() => signIn()}>signIn</button>
                    </li>
                )}
                {user && (
                    <>
                        <li>
                            <Image
                                className='rounded-full'
                                src={user?.image as string}
                                alt={user?.name as string}
                                height={48}
                                width={48}
                            />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
};
