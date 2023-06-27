export interface IProduct {
    name: string;
    image: string;
    unit_amount: number | null;
    id: string;
    quantity?: number | 1;
    description: string | null;
    metadata: IMetaData;
    currency: string;

}

export interface IMetaData {
    features: string;
}
