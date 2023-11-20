import styles from './Meals.module.css';
import MealItem from '../MealItem/MealItems';
import useHttp from '../../hooks/useHttp';

const requestConfig = {
  method: 'GET',
  headers: {
    'Content-type': 'application.json',
  },
};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  return (
    <>
      <ul id={styles.meals}>
        {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  );
}
