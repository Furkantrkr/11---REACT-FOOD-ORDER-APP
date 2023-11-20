import { useContext } from 'react';
import styles from './Checkout.module.css';
import CartContext from '../../store/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import UserProgressContext from '../../store/UserProgressContext';
import Modal from '../Modal/Modal';
import Input from '../UI/Input';
import useHttp from '../../hooks/useHttp';
import Error from '../Error/Error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.finishOrder();
    clearData();
    // sendRequest(
    //   JSON.stringify({
    //     order: {
    //       items: [],
    //       customer: {},
    //     },
    //   })
    // );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // {email: test@example.com, ...}

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = isSending ? (
    <span>Sending order data...</span>
  ) : (
    <>
      <Button onClick={handleClose} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully</p>
        <p>
          we will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className={styles['modal-actions']}>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Adress" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <div className={styles['control-row']}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title={'Failed to submit error'} message={error} />}
        <p className={styles['modal-actions']}>{actions}</p>
      </form>
    </Modal>
  );
}
