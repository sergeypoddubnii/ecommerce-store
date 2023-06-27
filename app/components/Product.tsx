import React, {FC} from 'react';
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import Link from "next/link";
import {IProduct} from "@/types/Product";


const Product:FC<IProduct> = ({name, image, unit_amount, id}:IProduct) => {
    return (
        <Link href={{
            pathname: `/product/${id}`,
            query: {name, image, unit_amount, id}
        }}>
            <div className='text-gray-700'>
                <Image
                    src={image}
                    alt={name}
                    className="w-full h-96 object-cover rounded-lg"
                    width={800}
                    height={800}
                />
                <div className='font-medium p-2'>
                    <h1>{name}</h1>
                    <h2 className='text-sm text-teal-700'>
                        {unit_amount ? formatPrice(unit_amount): 'N/A'}
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default Product;
