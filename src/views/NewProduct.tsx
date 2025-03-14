import {
    Form,
    Link,
    useActionData,
    ActionFunctionArgs,
    redirect,
} from 'react-router-dom';
import { addProduct } from '../services/ProductService';
import ProductForm from '../components/ProductForm';
import ErrorMessage from '../components/ErrorMessage';

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'All fields are required';
    }

    if (error.length) {
        return error;
    }

    await addProduct(data);
    localStorage.setItem('created', 'created product');
    return redirect('/');
}

function NewProduct() {
    const error = useActionData() as string;
    return (
        <>
            <div className='flex justify-between  p-2'>
                <h2 className='text-3xl font-black text-slate-500 '>
                    Add Product
                </h2>
                <Link
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                    to='/'>
                    Back
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className='mt-10 p-2.5' method='POST' action=''>
                <ProductForm></ProductForm>
                <input
                    type='submit'
                    className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
                    value='Save Product'
                />
            </Form>
        </>
    );
}

export default NewProduct;
