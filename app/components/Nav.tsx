'use client'

import {Session} from "next-auth";
import {signIn, signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useCartStore} from "@/store";
import Cart from "@/app/components/Cart";
import { AiFillShopping} from "react-icons/ai";
import {motion, AnimatePresence} from 'framer-motion';
import DarkLight from "@/app/components/DarkLight";

export default function Nav({user}:Session){
    const cartStore = useCartStore();
    return (
        <nav className='flex justify-between items-center py-12'>
            <Link href={'/'}>
                <h1>Logo</h1>
            </Link>
            <ul className={'flex items-center gap-12'}>
                <li
                    onClick={() => cartStore.toggleCart()}
                    className='flex items-center text-3xl relative cursor-pointer'
                >
                    <AiFillShopping/>

                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            <motion.span
                                className='bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center'
                                animate={{ scale: 1 }}
                                initial={{ scale: 0 }}
                                exit={{scale: 0}}
                            >
                                {cartStore.cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
                <DarkLight />
                {!user && (
                    <li className={'bg-primary text-white py-8 px-4 rounded-md'}>
                        <button onClick={() => signIn()}>signIn</button>
                    </li>
                )}
                {user && (
                    <li>
                        <div className='dropdown dropdown-end cursor-pointer'>
                            <Image
                                className='rounded-full'
                                src={user?.image as string}
                                alt={user?.name as string}
                                height={36}
                                width={36}
                                tabIndex={0}
                            />
                            <ul tabIndex={0} className='dropdown-content menu p-4 space-y-4 shadow bg-base-100'>
                                <Link
                                    href={'/dashboard'}
                                    className='hover:bg-base-300 p-4 rounded-md'
                                    onClick={() => {
                                        if(document.activeElement instanceof HTMLElement){
                                            document.activeElement.blur();
                                    }}}
                                >
                                    Orders
                                </Link>
                                <li
                                    className='hover:bg-base-300 p-4 rounded-md'
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    </li>
                )}
            </ul>
            <AnimatePresence>
                {cartStore.isOpen && <Cart />}
            </AnimatePresence>
        </nav>
    )
};
