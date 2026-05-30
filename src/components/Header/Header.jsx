'use client';

import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#hero" className={styles.logo}>
          <span className={styles.tilde}>~</span>
          <span className={styles.slash}>/</span>
          <span className={styles.name}>amogh</span>
        </a>
      </div>
      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
}
