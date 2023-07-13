'use client';

import {motion} from "framer-motion";
import Link from "next/link";
import {useCartStore} from "@/store";
import {useEffect} from "react";

export default function OrderConfirmed(){
    const cartStore = useCartStore();

    useEffect(() => {
        cartStore.setPaymentIntent('');
        cartStore.clearCart();
    },[])

    const handleCheckoutOrder = () => {
        setTimeout(() => {
            cartStore.setCheckout('cart');
            cartStore.toggleCart();
        }, 1000)
    }

    return (
        <motion.div
            initial={{scale: 0.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            className='flex items-center justify-center my-12'
        >
            <div className='p-12 rounded-md text-center'>
                <h1 className='text-2xl font-medium '>your order has been placed!</h1>
                <h2 className='font-medium text-sm my-4'>check your email</h2>
            </div>
            <div className='flex items-center justify-center gap-12'>
                <Link href={'/dashboard'}>
                    <button
                        className={'font-medium '}
                        onClick={handleCheckoutOrder}
                    >
                        check your order
                    </button>
                </Link>
            </div>
        </motion.div>
    )
}
