import styles from './MealItem.module.css';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import { useContext } from 'react';
import CartContext from '../../store/CartContext';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  return (
    <li className={styles['meal-item']}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className={styles['meal-item-price']}>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className={styles['meal-item-description']}>{meal.description}</p>
        </div>
        <p className={styles['meal-item-actions']}>
          <Button onClick={() => cartCtx.addItem(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
