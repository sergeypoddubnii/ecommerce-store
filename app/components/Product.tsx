import React, {FC} from 'react';
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";

interface IProps {
    name: string;
    image: string;
    unit_amount: number | null;
}

const Product:FC<IProps> = ({name, image, unit_amount}:IProps) => {
    return (
        <div className='text-gray-700'>
            <Image
                src={image}
                alt={name}
                className="w-full h-96 object-cover rounded-lg"
            />
            <div className='font-medium p-2'>
                <h1>{name}</h1>
                <h2 className='text-sm text-teal-700'>
                    {unit_amount ? formatPrice(unit_amount): 'N/A'}
                </h2>
            </div>
        </div>
    );
};

export default Product;
