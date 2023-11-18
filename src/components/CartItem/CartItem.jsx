import { useContext } from 'react';
import styles from './CartItem.module.css';
import { currencyFormatter } from '../../util/formatting';
import CartContext from '../../store/CartContext';

export default function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  return (
    <li className={styles['cart-item']}>
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className={styles['cart-item-actions']}>
        <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => cartCtx.addItem(item)}>+</button>
      </p>
    </li>
  );
}
