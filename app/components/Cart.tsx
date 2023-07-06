'use client';
import Image from 'next/image';
import {ICart, useCartStore} from "@/store";
import formatPrice from "@/util/PriceFormat";

export default function Cart(){
    const cartStore = useCartStore();

    return (
        <div
            className='fixed w-full h-screen left-0 top-0 bg-black/25'
            onClick={() => cartStore.toggleCart()}
        >
            <div
                className='bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700'
                onClick={(e) => e.stopPropagation()}
            >
                <h1 >
                    Shopping list
                </h1>
                {cartStore.cart.map((item:ICart) => {
                    return (
                        <div className='flex py-4 gap-4' key={item.name}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={120}
                                height={120}
                                className='rounded-md h-24'
                            />
                            <div>
                                <h2>{item.name}</h2>
                                <h2>Quantity: {item.quantity}</h2>
                                <p
                                    className='text-sm text-teal-700'
                                >
                                    Price: {item.unit_amount ? formatPrice(item.unit_amount) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    )
                })}
                <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
                    checkout
                </button>
            </div>
        </div>
    )
};
