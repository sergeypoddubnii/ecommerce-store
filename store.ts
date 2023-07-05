import {create} from 'zustand';
import {persist} from "zustand/middleware";

interface ICart {
    name: string;
    id: string;
    images?: string[],
    description?: string,
    unit_amount: number | null,
    quantity?: number,
}


interface ICartState {
    isOpen: boolean;
    cart: ICart[];
    toggleCart: () => void;
    addProduct: (product:ICart) => void;
}

export const useCartStore = create<ICartState>()(
    persist((set) => {
        return {
            cart: [],
            isOpen: false,
            toggleCart: () => set((state:ICartState) => ({isOpen: !state.isOpen})),
            addProduct: (product:ICart) => set((state) => {
                const existingItem = state.cart.find((cartItem:ICart) => cartItem.id === product.id);
                if(existingItem){
                    const updatedCart = state.cart.map(cartItem => {
                        if(cartItem.id === product.id) {
                            return {...cartItem, quantity: cartItem.quantity + 1 }
                        }
                        return cartItem;
                    })
                    return {cart: updatedCart}
                } else {
                    return {cart: [...state.cart, {...product, quantity: 1 }]}
                }

            }),
        };
    },
    {name: 'cart-store'}
        )
);
