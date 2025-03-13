import { object, string, number, boolean, array, Output } from 'valibot';

export const DraftProductSchema = object({
    name: string(),
    price: number(),
    amount: number(),
    category: string(),
});

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    amount: number(),
    category: string(),
    availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = Output<typeof ProductSchema>;
