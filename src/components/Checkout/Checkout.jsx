import { useContext } from 'react';
import styles from './Checkout.module.css';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import UserProgressContext from '../../store/UserProgressContext';
import Modal from '../Modal/Modal';
import Input from '../UI/Input';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  const fd = new FormData();

  return (
    <Modal open={userProgressCtx.progress === 'checkout'}>
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="Email Adress" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <div className={styles['control-row']}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className={styles['modal-actions']}>
          <Button onClick={userProgressCtx.hideCheckout} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
