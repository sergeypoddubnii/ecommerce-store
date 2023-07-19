import {PrismaClient} from '@prisma/client';
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";


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
    console.log('orders', orders);
    if(orders === null)return(<div/>)
    return (
        <div className='text-bold'>
            {orders.length === 0 ?  <h1>No Orders</h1> : <h1>Your Orders</h1>}
            <div className='font-medium'>
                {orders.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className='rounded-lg'
                        >
                            <h2>Order reference: {item.id}</h2>
                            <p>Time:{item.createdDate.toString()}</p>
                            <p className='text-md py-2'>
                                Status:
                                <span className={`${item.status === 'complete' ? 'bg-teal-500': 'bg-orange-500'} text-white py-1`}>
                                    {item.status}
                                </span>
                            </p>
                            <p className='font-medium'>
                                Total:{formatPrice(item.amount)}
                            </p>
                            <div className='flex gap-8'>
                                {item.products.map((product) => {
                                    return (
                                        <div
                                            key={product.id}
                                            className='py-2'
                                        >
                                            <h2 className='py-2'>
                                                {product.name}
                                            </h2>
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
