import {PrismaClient} from '@prisma/client';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
    const prisma = new PrismaClient();
    const user = getServerSession(authOptions);

    if(!user){
        return null;
    }

    const orders = await prisma.order.findMany({
        where: {userId: user?.user?.id},
        include: {
            products: true
        }
    })

    return orders;

};

export default async function  Dashboard(){
    const orders = await fetchOrders();
    if(orders === null){
        return(<div>You need to be logged in to view orders...</div>)
    }

    return (
        <div className='text-bold'>
            {orders.length === 0 ?  <h1>No Orders</h1> : <h1>Your Orders</h1>}
            <div className='font-medium rounded-lg p-8 my-12 bg-base-200'>
                {orders.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className='rounded-lg'
                        >
                            <h2 className='text-xs font-medium'>Order reference: {item.id}</h2>
                            <p className='text-xs'>Time:{item.createdDate.toString()}</p>
                            <p className='text-md py-2'>
                                Status:
                                <span className={`${item.status === 'complete' ? 'bg-teal-500': 'bg-orange-500'} text-white py-1 rounded-md px-2 mx-2 text-sm`}>
                                    {item.status}
                                </span>
                            </p>
                            <p className='font-medium'>
                                Total:{formatPrice(item.amount)}
                            </p>
                            <div className='lg:flex items-center gap-2'>
                                {item.products.map((product) => {
                                    return (
                                        <div
                                            key={product.id}
                                            className='py-2'
                                        >
                                            <h2 className='py-2'>
                                                {product.name}
                                            </h2>
                                            <div className='flex items-center gap-4'>
                                                <Image
                                                    src={product.image as string}
                                                    alt={product.name}
                                                    width={36}
                                                    height={36}
                                                />
                                                <p>{formatPrice(product.unit_amount)}</p>
                                                <p>Quantity: {product.quantity}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};
