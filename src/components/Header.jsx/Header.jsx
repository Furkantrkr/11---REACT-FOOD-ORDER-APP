import styles from './Header.module.css';
import logo from '../../assets/logo.jpg';
import Button from '../UI/Button';
import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import UserProgressContext from '../../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
    return totalNumberofItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id={styles['main-header']}>
      <div id={styles.title}>
        <img src={logo} alt="logo" />
        <h1>ORDER NOW</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
