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
        <div>
            <Image
                src={image}
                alt={name}
                width={400}
                height={400}
            />
            {name}{' '}
            {unit_amount ? formatPrice(unit_amount): 'N/A'}
        </div>
    );
};

export default Product;
