import styles from './Meals.module.css';
import MealItem from '../MealItem/MealItems';
import useHttp from '../../hooks/useHttp';
import Error from '../Error/Error';

const requestConfig = {
  method: 'GET',
  headers: {
    'Content-type': 'application.json',
  },
};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
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
