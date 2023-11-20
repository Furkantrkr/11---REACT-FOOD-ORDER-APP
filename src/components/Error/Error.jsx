import styles from './Error.module.css';

export default function Error({ title, message }) {
  return (
    <div className={styles.error}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
