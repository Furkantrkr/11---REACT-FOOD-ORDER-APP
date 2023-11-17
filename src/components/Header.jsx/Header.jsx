import styles from './Header.module.css';
import logo from '../../assets/logo.jpg';
import Button from '../UI/Button';

export default function Header() {
  return (
    <header id={styles['main-header']}>
      <div id={styles.title}>
        <img src={logo} alt="logo" />
        <h1>ORDER NOW</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
