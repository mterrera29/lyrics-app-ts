import { ReactNode } from 'react';
import styles from './ButtonCategory.module.css';

type ButtonCategoryProps = {
  children: ReactNode;
  selected: boolean;
};

export default function ButtonX({ children, selected }: ButtonCategoryProps) {
  return (
    <div
      className={styles.buttonX}
      style={
        selected
          ? { backgroundColor: 'var(--purple)' }
          : { backgroundColor: 'var(--purpleOpacity2)' }
      }
    >
      {children}
    </div>
  );
}
