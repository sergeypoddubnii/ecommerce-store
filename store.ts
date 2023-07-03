import {create} from 'zustand';
import {persist} from "zustand/middleware";

interface ICart {
    name: string;
    id: string;
    images?: string[],
    description?: string,
    unit_amount: number,
    quantity: number,
}


interface ICartState {
    isOpen: boolean;
    cart: ICart[]
}

export const useCartStore = create<ICartState>()(
    persist((set) => {
        return {
            cart: [],
            isOpen: false,
        };
    },
        {name: 'cart-store'}
        )
);
