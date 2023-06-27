import React from 'react';
import {IProduct} from "@/types/Product";
import Image from "next/image";

interface IProps {
    searchParams : IProduct,
    params: {
        id: string;
    }
}

async function Product ({searchParams, params}:IProps) {
    console.log('searchParams', searchParams)
    return (
        <div className='flex justify-between gap-24 p-12 text-gray-700'>
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={600}
                height={600}
            />
            <div>
                <h1>{searchParams.name}</h1>
                <p>description</p>
            </div>
        </div>
    );
};

export default Product;
