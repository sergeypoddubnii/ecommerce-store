import {create} from 'zustand';
import {persist} from "zustand/middleware";
import product from "@/app/components/Product";

export interface ICart {
    name: string;
    id: string;
    image: string,
    description?: string,
    unit_amount: number | null,
    quantity?: number,
}


interface ICartState {
    isOpen: boolean;
    cart: ICart[];
    toggleCart: () => void;
    addProduct: (product:ICart) => void;
    removeProduct: (product: ICart) => void;
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
                    const updatedCart:ICart[] = state.cart.map((cartItem:ICart) => {
                        if(cartItem.id === product.id) {
                            return {...cartItem, quantity: cartItem.quantity ? cartItem.quantity + 1 : 1 }
                        }
                        return cartItem;
                    })
                    return {cart: updatedCart}
                } else {
                    return {cart: [...state.cart, {...product, quantity: 1 }]}
                }

            }),
            removeProduct: (product: ICart) => set((state) => {
                const existingItem = state.cart.find((cartItem:ICart) => cartItem.id === product.id);
                if(existingItem && existingItem.quantity! > 1){
                    const updated = state.cart.map((cartItem) => {
                        if(cartItem.id === product.id) {
                            return {...cartItem, quantity: cartItem.quantity! - 1};
                        }
                        return cartItem;
                    })
                    return {cart : updated}
                } else {
                    const filteredCart = state.cart.filter((item) => item.id !== product.id);
                    return { cart: filteredCart};
                }

            }),
        };
    },
    {name: 'cart-store'}
        )
);
