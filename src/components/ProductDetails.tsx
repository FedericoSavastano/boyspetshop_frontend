import { Product } from '../types';
import {
    useFetcher,
    useNavigate,
    Form,
    redirect,
    ActionFunctionArgs,
} from 'react-router-dom';
import { deleteProduct } from '../services/ProductService';
import { formatCurrency } from '../utils';

import { toast } from 'react-toastify';
import { useEffect } from 'react';

type ProductDetailsProps = {
    product: Product;
};

//Delete action function navigates to /delete url, and after deletion returns to main page
export async function action({ params }: ActionFunctionArgs) {
    if (params.id != undefined) {
        await deleteProduct(+params.id);
        localStorage.setItem('deleted', 'deleted product');

        return redirect('/');
    }
}

function ProductDetails({ product }: ProductDetailsProps) {
    const isAvailable = product.availability;
    const fetcher = useFetcher();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('deleted')) {
            console.log('toast del');
            setTimeout(() => {
                toast.success('Product deleted');
            }, 500);

            localStorage.removeItem('deleted');
        }

        // if (localStorage.getItem('edited')) {
        //     console.log('toast ed');
        //     toast.success('Product edited');
        //     localStorage.removeItem('edited');
        // }

        // if (localStorage.getItem('created')) {
        //     console.log('toast cr');
        //     toast.success('Product created');
        //     localStorage.removeItem('created');
        // }
    }, [product]);

    return (
        <tr className='border-b '>
            <td className='p-3    text-gray-800 min-w-[18ch]  sm:text-xs lg:text-lg'>
                {product.name}
            </td>
            <td className='p-3    text-gray-800 sm:text-xs lg:text-lg'>
                {formatCurrency(product.price)}
            </td>
            <td className='p-3 text-lg   text-gray-800 min-w-[15ch]  sm:text-xs lg:text-lg'>
                {product.category}
            </td>
            <td className='p-3 text-lg   text-gray-800 sm:text-xs lg:text-lg'>
                {product.amount}
            </td>
            <td className='p-3 text-lg   text-gray-800 sm:text-xs lg:text-lg'>
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='availability'
                        value={product.availability.toString()}
                        className={`${
                            isAvailable ? 'text-black' : 'text-red-600'
                        } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}>
                        {isAvailable ? 'Available' : 'Non available'}
                    </button>
                    <input type='hidden' name='id' value={product.id} />
                </fetcher.Form>
            </td>
            <td className='p-3 text-lg md:text-xs text-gray-800 '>
                <div className='flex gap-2 items-center'>
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-black text-xs text-center hover:cursor-pointer'>
                        Edit
                    </button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm(`Delete ${product.name}? `)) {
                                e.preventDefault();
                            }
                        }}>
                        <input
                            type='submit'
                            value='Delete'
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-black text-xs text-center hover:cursor-pointer'
                        />
                        {/* <ToastContainer /> */}
                    </Form>
                </div>
            </td>
        </tr>
    );
}

export default ProductDetails;
