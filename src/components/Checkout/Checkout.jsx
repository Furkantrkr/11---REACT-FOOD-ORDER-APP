import { useContext } from 'react';
import styles from './Checkout.module.css';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../util/formatting';

export default function Checkout() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce(
    totalPrice,
    (item) => totalPrice + item.price * item.quantity,
    0
  );

  return (
    <Modal>
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
      </form>
    </Modal>
  );
}
