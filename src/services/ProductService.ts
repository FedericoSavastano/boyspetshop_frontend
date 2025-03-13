import { safeParse } from 'valibot';
import {
    DraftProductSchema,
    ProductSchema,
    ProductsSchema,
    Product,
} from '../types';
import axios from 'axios';
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
    try {
        //validation of data in valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price,
            amount: +data.amount,
            category: data.category,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price,
                amount: result.output.amount,
                category: result.output.category,
            });
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            throw new Error('There was an error in retrieving products');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data);

        if (result.success) {
            return result.output;
        } else {
            throw new Error('There was an error in retrieving products');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        const result = safeParse(ProductSchema, {
            id: +id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString()),
            amount: +data.amount,
            category: data.category,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        } else {
            throw new Error('There was an error in updating product');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
}
