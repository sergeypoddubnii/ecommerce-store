'use client';

import {useEffect, useState} from "react";
import { loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import {useCartStore} from "@/store";
import {useRouter} from "next/navigation";
import CheckoutForm from "@/app/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout(){
    const cartStore = useCartStore();
    const [clientSecret, setClientSecret] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent
            })
        }).then((response) => {
            if(response.status === 403) {
                return router.push('/api/auth/signin')
            }
            return response.json();
        }).then((data) => {
            setClientSecret(data.paymentIntent.client_secret);
            cartStore.setPayment(data.paymentIntent.id)
        })
    },[])

    const options:StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating',

        }
    }
    return (
        <div>
            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}
                >
                    <CheckoutForm clientSecret={clientSecret}/>
                </Elements>
            )}
        </div>
    )
};
