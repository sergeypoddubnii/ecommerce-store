import Stripe from 'stripe';

const getProducts = async() => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: "2022-11-15"});
    const products = await stripe.products.list();

    const productWithPrices = await Promise.all(products.data.map(async(product) => {
        const prices = await stripe.prices.list(({product: product.id}))
        return {
            id: product.id,
            name: product.name,
            price: prices.data[0].unit_amount,
            currency: prices.data[0].currency,
        }
    }));

    return productWithPrices;
}

export default async function Home() {
    const products = await getProducts();
    console.log('products',products)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className='text-3xl'>dashboard</h1>
        </main>
    )
}
