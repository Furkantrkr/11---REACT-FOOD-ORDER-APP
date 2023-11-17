import { useState, useEffect } from 'react';
import styles from './Meals.module.css';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        return;
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <>
      <ul id={styles.meals}>
        {loadedMeals.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
    </>
  );
}
