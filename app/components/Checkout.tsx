'use client';

import {useEffect, useState} from "react";
import { loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import {useCartStore} from "@/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout(){
    const cartStore = useCartStore();
    const [clientServer, setClientServer] = useState<string>('');

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intend_id: cartStore.paymentIntent
            })
        })
    },[])
};
