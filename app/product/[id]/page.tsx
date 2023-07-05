import React from 'react';
import {IProduct} from "@/types/Product";
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import AddCart from "@/app/product/[id]/AddCart";

interface IProps {
    searchParams : IProduct,
    params: {
        id: string;
    }
}

async function Product ({searchParams, params}:IProps) {
    return (
        <div className='flex justify-between gap-24 p-12 text-gray-700'>
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={400}
                height={400}
            />
            <div className={'font-medium text-gray-700'}>
                <h1 className='text-2xl font-medium py-2'>{searchParams.name}</h1>
                <p className='py-2 '>{searchParams.description}</p>
                <p>{searchParams.metadata?.features}</p>
                <div className='flex gap-2'>
                    <p className='font-bold text-teal-700'>
                        {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
                    </p>
                </div>
                <AddCart {...searchParams}/>
            </div>
        </div>
    );
};

export default Product;
