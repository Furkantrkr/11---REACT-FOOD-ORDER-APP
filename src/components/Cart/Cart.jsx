import { useContext } from 'react';
import Modal from '../Modal/Modal';
import CartItem from '../CartItem/CartItem';
import CartContext from '../../store/CartContext';
import Button from '../UI/Button';
import { currencyFormatter } from '../../util/formatting';

import styles from './Cart.module.css';
import UserProgressContext from '../../store/UserProgressContext';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;

  const userProgressCtx = useContext(UserProgressContext);
  const progress = userProgressCtx.progress;

  const cartTotal = items.reduce(
    (totalPrice, item) => item.quantity * item.price + totalPrice,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  console.log(cartTotal);
  return (
    <Modal
      className={styles.cart}
      open={progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className={styles['cart-total']}>
        {currencyFormatter.format(cartTotal)}
      </p>
      <p className={styles['modal-actions']}>
        <Button onClick={handleCloseCart}>Close</Button>
        {items.length > 0 && (
          <Button onClick={userProgressCtx.showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
