import { Product } from '../types';
import { categoriesOptions } from '../utils';

type ProductFormProps = {
    product?: Product;
};

function ProductForm({ product }: ProductFormProps) {
    return (
        <>
            {' '}
            <div className='mb-4 text-left'>
                <label className='text-gray-800' htmlFor='name'>
                    Name:
                </label>
                <input
                    id='name'
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-50'
                    placeholder='Product name'
                    name='name'
                    defaultValue={product?.name}
                />
            </div>
            <div className='mb-4 text-left'>
                <label className='text-gray-800' htmlFor='price'>
                    Price:
                </label>
                <input
                    id='price'
                    type='number'
                    className='mt-2 block w-full p-3 bg-gray-50'
                    placeholder='Product price'
                    name='price'
                    min={1}
                    defaultValue={product?.price}
                />
            </div>
            <div className='mb-4 text-left'>
                <label className='text-gray-800' htmlFor='category'>
                    Category:
                </label>
                <select
                    name='category'
                    id='category'
                    className='mt-2 block w-full p-3 bg-gray-50'
                    defaultValue={product?.category}>
                    {categoriesOptions.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-4 text-left'>
                <label className='text-gray-800' htmlFor='amount'>
                    Amount:
                </label>
                <div className='flex  '>
                    <input
                        id='amount'
                        type='number'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Product amount'
                        step={1}
                        min={0}
                        name='amount'
                        defaultValue={product?.amount}
                    />
                </div>
            </div>
        </>
    );
}

export default ProductForm;
