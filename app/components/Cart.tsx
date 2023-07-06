'use client';
import Image from 'next/image';
import {ICart, useCartStore} from "@/store";
import formatPrice from "@/util/PriceFormat";
import {IoAdd, IoAddCircle, IoRemoveCircle} from "react-icons/io5";

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
                        </div>
                    )
                })}
                {Boolean(cartStore.cart.length) &&  (
                    <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
                        checkout
                    </button>
                )}
                {!cartStore.cart.length && (
                    <div className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'>
                        <h1>it is empty...(((</h1>
                    </div>
                )}

            </div>
        </div>
    )
};
