import { Link, ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import {
    getProducts,
    updateProductAvailability,
} from '../services/ProductService';
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

export async function loader() {
    const products = await getProducts();
    return products;
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    await updateProductAvailability(+data.id);
    return {};
}

function Products() {
    const products = useLoaderData() as Product[];

    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortToggle, setSortToggle] = useState(false);

    useEffect(() => {
        // if (localStorage.getItem('deleted')) {
        //     setTimeout(() => {
        //         toast.success('Product deleted');
        //     }, 500);

        //     localStorage.removeItem('deleted');
        // }

        if (localStorage.getItem('edited')) {
            setTimeout(() => {
                toast.success('Product edited');
            }, 500);

            localStorage.removeItem('edited');
        }

        if (localStorage.getItem('created')) {
            setTimeout(() => {
                toast.success('Product created');
            }, 500);

            localStorage.removeItem('created');
        }

        setSortedProducts(products);
    }, [products]);

    const handleSort = (e) => {
        if (sortToggle)
            setSortedProducts(
                sortedProducts.sort(function (a, b) {
                    if (b[e.target.id] > a[e.target.id]) {
                        return -1;
                    }
                    if (b[e.target.id] < a[e.target.id]) {
                        return 1;
                    }
                    return 0;
                })
            );
        else {
            setSortedProducts(
                sortedProducts.sort(function (a, b) {
                    if (b[e.target.id] < a[e.target.id]) {
                        return -1;
                    }
                    if (b[e.target.id] > a[e.target.id]) {
                        return 1;
                    }
                    return 0;
                })
            );
        }

        setSortToggle(!sortToggle);
    };

    return (
        <>
            <div className='flex justify-between  p-2'>
                <h2 className='text-3xl font-black text-slate-500 '>
                    Products
                </h2>
                <Link
                    className='rounded-md bg-amber-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500'
                    to='products/new'>
                    {' '}
                    Add Products{' '}
                </Link>
            </div>

            <div className='p-2 overflow-auto'>
                <table className='w-full mt-5  table-auto  '>
                    <thead className='bg-slate-500 text-white  '>
                        <tr>
                            <th
                                className='p-2 cursor-pointer hover:bg-slate-800'
                                id='name'
                                onClick={(e) => handleSort(e)}>
                                Name
                            </th>
                            <th
                                className='p-2 cursor-pointer hover:bg-slate-800'
                                id='price'
                                onClick={(e) => handleSort(e)}>
                                Price
                            </th>
                            <th
                                className='p-2 cursor-pointer hover:bg-slate-800'
                                id='category'
                                onClick={(e) => handleSort(e)}>
                                Category
                            </th>
                            <th
                                className='p-2 cursor-pointer hover:bg-slate-800'
                                id='amount'
                                onClick={(e) => handleSort(e)}>
                                Amount
                            </th>
                            <th
                                className='p-2 cursor-pointer hover:bg-slate-800'
                                id='availability'
                                onClick={(e) => handleSort(e)}>
                                Availability
                            </th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*  {sortedProducts.map((product) => (
                            <ProductDetails
                                product={product}
                                key={product.id}></ProductDetails>
                        ))}*/}

                        {products.map((product) => (
                            <ProductDetails
                                product={product}
                                key={product.id}></ProductDetails>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </>
    );
}

export default Products;
