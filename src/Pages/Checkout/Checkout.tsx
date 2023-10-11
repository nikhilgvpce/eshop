import { MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cartItem } from '../CartItemsContext/CartItemsContext';
import "./Checkout.css"

const Checkout = () => {
  const { state } = useLocation();
  const cartItems: cartItem[] = state;

  const total_price = cartItems.reduce(
    (previous, currValue) => (previous = previous + currValue.price),
    0
  );

  const [checkedId, setSelectedPaymentMethod] = useState('');

  const paymentMethods = [
    {
      id: 'card-payment',
      value: 'card payment VISA/MasterCard',
    },
    {
      id: 'upi-payment',
      value: 'UPI--PhonePe, GPay, PayTm',
    },
    {
      id: 'netbanking-payment',
      value: 'NetBanking--HDFC, SBI, ICICI',
    },
  ];


  const handlePaymentClick = (event: MouseEvent<HTMLInputElement>) => {
    const { id } = event.target as HTMLElement;
    setSelectedPaymentMethod(id)
  }

  return (
    <div className='payment-wrapper'>
      <p className='payment-price'>Total Cart Value: ${total_price}</p>
      <fieldset>
        {paymentMethods.map((payment) => (
          <div className='payment-method' key={payment.id}>
            <input
              type='radio'
              id={payment.id}
              value={payment.value}
              className={payment.id}
              checked={checkedId === payment.id}
              onClick={handlePaymentClick}
            />
            <label htmlFor={payment.id}>{payment.value}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default Checkout;
