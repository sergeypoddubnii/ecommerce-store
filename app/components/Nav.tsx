'use client'

import {Session} from "next-auth";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useCartStore} from "@/store";
import Cart from "@/app/components/Cart";
import { AiFillShopping} from "react-icons/ai";

export default function Nav({user}:Session){
    const cartStore = useCartStore();
    return (
        <nav className='flex justify-between items-center py-12'>
            <Link href={'/'}>
                <h1>Logo</h1>
            </Link>
            <ul className={'flex items-center gap-12'}>
                <li className='flex items-center text-3xl relative cursor-pointer'>
                    <AiFillShopping/>
                    <span className='bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'>
                        {cartStore.cart.length}
                    </span>
                </li>
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
                                height={36}
                                width={36}
                            />
                        </li>
                    </>
                )}
            </ul>
            {cartStore.isOpen && <Cart />}
        </nav>
    )
};
