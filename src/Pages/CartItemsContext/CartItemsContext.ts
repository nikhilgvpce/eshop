import { createContext } from "react";

export interface cartItem {
    _id?: string
    name: string,
    instructorDetails: string,
    img: string,
    rating: string,
    price: number
}

export interface CartItemsContextType {
    cartItems: cartItem[],
    setCartItems: (items: cartItem[]) => void;
}

const CartItemsContext = createContext(<CartItemsContextType | undefined>{});

export default CartItemsContext;