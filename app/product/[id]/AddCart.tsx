'use client';
import {useCartStore} from "@/store";
import {useState} from "react";

interface IAddCart {
    name: string;
    id: string;
    image: string;
    unit_amount: number | null;
    quantity?: number | 1 ;
}

export default function AddCart({name, id, image, unit_amount, quantity}:IAddCart) {
    const cartStore  = useCartStore();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        cartStore.addProduct({id, name, image, unit_amount, quantity});
        setIsAdded(false);

        setTimeout(() => {
            setIsAdded(false);
        }, 500)
    };

    return (
        <>
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className='my-4 btn btn-primary w-full'
            >
                {!isAdded ? <span>Add to cart</span> : <span>Adding to cart</span>}
            </button>
        </>
    );
}
