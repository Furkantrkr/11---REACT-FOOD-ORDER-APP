import styles from './Button.module.css';

export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? 'text-button' : 'button';
  if (className) {
    cssClasses += ' ' + className;
  }
  return (
    <button {...props} className={styles[cssClasses]}>
      {children}
    </button>
  );
}
