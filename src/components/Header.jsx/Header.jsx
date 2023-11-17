import styles from './Header.module.css';
import logo from '../../assets/logo.jpg';

export default function Header() {
  return (
    <header id={styles['main-header']}>
      <div id={styles.title}>
        <img src={logo} alt="logo" />
        <h1>ORDER NOW</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
