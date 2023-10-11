import { useContext } from 'react';
import Button from '../Button/Button';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import CartItemsContext from '../../Pages/CartItemsContext/CartItemsContext';

const Header = () => {


  const navigate = useNavigate();

  const cartContext = useContext(CartItemsContext);


  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
   <>
     <header className='app-header'>
      <div className='app-header-wrapper'>
        <a href={`${window.location.origin}`+'/login'} className='app-header-link'>
          E-Learn
        </a>
        <input
          className='course-search'
          type='search'
          placeholder='search courses here...'
        />
        <Button disabled={!cartContext?.cartItems?.length} onClick={handleCartClick} className='app-header-cart-button' text={cartContext ? cartContext.cartItems.length.toString() : ''}/>
      </div>
    </header>
   </>
  );
};

export default Header;
