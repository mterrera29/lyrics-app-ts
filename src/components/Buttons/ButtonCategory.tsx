import styles from './ButtonCategory.module.css';

export default function ButtonCategory({ children }) {
  return <div className={styles.button}>{children}</div>;
}
