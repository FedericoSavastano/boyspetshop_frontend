import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {
    loader as productsLoader,
    action as productsAction,
} from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import EditProduct, {
    loader as editProductLoader,
    action as editProductAction,
} from './views/EditProduct';
import WrongUrl from './views/WrongUrl';

import { action as deleteProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Products></Products>,
                loader: productsLoader,
                action: productsAction,
                hydrateFallbackElement: <p>Loading...</p>,
            },
            {
                path: 'products/new',
                element: <NewProduct></NewProduct>,
                action: newProductAction,
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct></EditProduct>,
                loader: editProductLoader,
                action: editProductAction,
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction,
            },
            {
                path: '*',
                element: <WrongUrl></WrongUrl>,
            },
        ],
    },
]);
