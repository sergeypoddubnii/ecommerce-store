'use client'

import Image from 'next/image';
import {ICart, useCartStore} from "@/store";
import formatPrice from "@/util/PriceFormat";
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5";
import {AnimatePresence, motion} from 'framer-motion';
import Checkout from "@/app/components/Checkout";

export default function Cart(){
    const cartStore = useCartStore();

    const totalPrice = cartStore.cart.reduce((acc:number, item:ICart) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0);
    console.log('cartStore', cartStore)

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed w-full h-screen left-0 top-0 bg-black/25'
            onClick={() => cartStore.toggleCart()}
        >
            <motion.div
                layout
                className='bg-white absolute right-0 top-0 h-screen p-12 overflow-y-scroll text-gray-700 w-full lg:w-2/5 '
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className=' text-sm font-bold pb-12 '
                    onClick={() => cartStore.toggleCart()}
                >
                    Back to store
                </button>
                {cartStore.onCheckout === 'cart' && (
                    <>
                        {cartStore.cart.map((item:ICart) => {
                            return (
                                <motion.div
                                    className='flex py-4 gap-4'
                                    key={item.name}
                                    layout
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={120}
                                        height={120}
                                        className='rounded-md h-24'
                                    />
                                    <div className='flex gap-2'>
                                        <h2>{item.name}</h2>
                                        <div>
                                            <h2>Quantity: {item.quantity}</h2>
                                            <button onClick={() => cartStore.removeProduct({
                                                id: item.id,
                                                image: item.image,
                                                name: item.name,
                                                unit_amount: item.unit_amount
                                            })}>
                                                <IoRemoveCircle/>
                                            </button>
                                            <button onClick={() => cartStore.addProduct({
                                                id: item.id,
                                                image: item.image,
                                                name: item.name,
                                                unit_amount: item.unit_amount
                                            })}>
                                                <IoAddCircle/>
                                            </button>
                                        </div>
                                        <p
                                            className='text-sm text-teal-700'
                                        >
                                            Price: {item.unit_amount ? formatPrice(item.unit_amount) : 'N/A'}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </>
                )}
                <motion.div layout>
                    {Boolean(cartStore.cart.length) &&  (
                        <>
                            <p>Total: {formatPrice(totalPrice)}</p>
                            <button
                                className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'
                                onClick={() => cartStore.setCheckout('checkout')}
                            >
                                checkout
                            </button>
                        </>
                    )}
                </motion.div>
                {cartStore.onCheckout === 'checkout' && <Checkout/>}
                <AnimatePresence>
                    {!cartStore.cart.length && (
                        <motion.div
                            className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'
                            animate={{scale: 1, rotateZ: 0, opacity: 0.75}}
                            initial={{scale: 0.5, rotateZ: -10, opacity: 0}}
                            exit={{scale: 0.5, rotateZ: -10, opacity: 0}}
                        >
                            <h1>it is empty...(((</h1>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </motion.div>
    )
};
