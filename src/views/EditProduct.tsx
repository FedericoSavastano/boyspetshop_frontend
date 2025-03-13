import React from 'react';
import {
    Form,
    Link,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
} from 'react-router-dom';
import {
    addProduct,
    getProductById,
    updateProduct,
} from '../services/ProductService';
import { Product } from '../types';
import ProductForm from '../components/ProductForm';
import ErrorMessage from '../components/ErrorMessage';

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductById(+params.id);
        if (!product) {
            // throw new Response('', {
            //     status: 404,
            //     statusText: 'No encontrado',
            // });

            return redirect('/');
        }

        return product;
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'All fields are required';
    }

    if (error.length) {
        return error;
    }

    if (params.id !== undefined) {
        await updateProduct(data, params.id);
        localStorage.setItem('edited', 'edited product');
        return redirect('/');
    }
}

const availabilityOptions = [
    { name: 'Available', value: true },
    { name: 'Non available', value: false },
];

function EditProduct() {
    // const product = {
    //     name: 'Purina Dog Food',
    //     price: 200,
    //     amount: 5,
    //     category: 'Cat food',
    //     availability: true,
    //     id: 1223323232,
    // };

    const product = useLoaderData() as Product;
    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between p-2'>
                <h2 className='text-3xl font-black text-slate-500'>
                    Edit Product
                </h2>
                <Link
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                    to='/'>
                    Back
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className='mt-10 p-2.5' method='POST' action=''>
                <ProductForm product={product}></ProductForm>

                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='availability'>
                        Availability:
                    </label>
                    <select
                        id='availability'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        name='availability'
                        defaultValue={product?.availability.toString()}>
                        {availabilityOptions.map((option) => (
                            <option
                                key={option.name}
                                value={option.value.toString()}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type='submit'
                    className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
                    value='Save Changes'
                />
            </Form>
        </>
    );
}

export default EditProduct;
