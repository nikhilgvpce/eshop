import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateCourse from '../CreateCourse/CreateCourse';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Layout.css';
import Cart from '../Cart/Cart';
import CartItemsContext, { cartItem } from '../CartItemsContext/CartItemsContext';
import { useEffect, useState } from 'react';
import Checkout from '../Checkout/Checkout';
import useFetch from '../../Hooks/fetch';

const Layout = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/createcourse',
          element: <CreateCourse />,
        },
        {
          path: '/landing',
          element: <Landing />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/checkout',
          element: <Checkout />,
        },
      ],
    },
  ]);

  const { fetch } = useFetch();

  const [ cartItems, setCartItems ] = useState<cartItem[]>([]);

  useEffect(() => {
    fetch('/getcartitems', 'POST').then((res) => res.json()).then((res) => {
      console.log('res inside cart is', res)
      setCartItems(res.cartItems)
    })
  }, [])

  return (
    <CartItemsContext.Provider value={{cartItems, setCartItems}}>
      <RouterProvider router={router} />
    </CartItemsContext.Provider>
  );
};

export default Layout;
