import { useContext, useEffect } from 'react';
import Button from '../../components/Button/Button';
import './Cart.css';
import CartItemsContext from '../CartItemsContext/CartItemsContext';
import { useNavigate } from 'react-router-dom';
// import useFetch from '../../Hooks/fetch';

const Cart = () => {
  const cartContext = useContext(CartItemsContext);

  const navigate = useNavigate();

//   const { fetch } = useFetch();

//   const [ cartItems, setCartItems ] = useState([])

  useEffect(() => {
    if (cartContext?.cartItems && cartContext.cartItems.length) {
      sessionStorage.setItem(
        'cartItems',
        JSON.stringify(cartContext.cartItems)
      );
    } else {
      cartContext?.setCartItems(
        JSON.parse(sessionStorage.getItem('cartItems') || '')
      );
    }
  }, []);

  const handleCheckOut = () => {
    navigate('/checkout', { state: cartContext?.cartItems });
  };

  return (
    <div className='cart-wrapper'>
      {cartContext?.cartItems.map((cartItem) => {
        if (cartItem) {
          return (
            <div
              className='cart-item'
              key={`${cartItem.name}+${cartItem.instructorDetails}`}
            >
              <img className='cart-item-image' src={cartItem.img} />
              <p className='cart-item-name'>{cartItem.name}</p>
              <strong className='cart-item-instructor'>
                {cartItem.instructorDetails}
              </strong>
              <p className='cart-item-ratings'>ratings: {cartItem.rating}</p>
              <p className='cart-item-price'>${cartItem.price}</p>
              <hr />
            </div>
          );
        }
        return;
      })}
      <div className='cart-checkout-wrapper'>
        <Button
          disabled={
            !cartContext?.cartItems || cartContext.cartItems.length === 0
          }
          className='cart-checkout-btn'
          text='Checkout'
          onClick={handleCheckOut}
        />
      </div>
    </div>
  );
};

export default Cart;
