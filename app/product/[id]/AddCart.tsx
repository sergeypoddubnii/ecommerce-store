'use client';
import {useCartStore} from "@/store";

interface IAddCart {
    name: string;
    id: string;
    image: string;
    unit_amount: number | null;
    quantity?: number | 1 ;
}

export default function AddCart({name, id, image, unit_amount, quantity}:IAddCart) {
    const cartStore  = useCartStore();

    return (
        <>
            <button
                onClick={() => cartStore.addProduct({id, name, image, unit_amount, quantity})}
                className='my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700'
            >
                Add to cart
            </button>
        </>
    );
}
