import { ReactNode } from 'react';
import styles from './ButtonCategory.module.css';

type ButtonCategoryProps = {
  children: ReactNode;
  selected: boolean;
};

export default function ButtonCategory({
  children,
  selected,
}: ButtonCategoryProps) {
  return (
    <div
      className={styles.button}
      style={
        selected
          ? { backgroundColor: 'var(--purple)' }
          : { backgroundColor: 'var(--purpleOpacity)' }
      }
    >
      {children}
    </div>
  );
}
