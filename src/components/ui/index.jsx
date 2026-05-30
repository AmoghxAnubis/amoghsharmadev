'use client';

import { motion } from 'framer-motion';
import styles from './ui.module.css';

// ─── Section Heading ────────────────────────────────────────
export function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      className={styles.sectionHeading}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {label && <p className={styles.label}>{label}</p>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}

// ─── Glass Card ─────────────────────────────────────────────
export function GlassCard({ children, className = '', style = {}, ...props }) {
  return (
    <motion.div
      className={`${styles.glassCard} ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Gradient Button ────────────────────────────────────────
export function GradientButton({ children, variant = 'fill', href, onClick, ...props }) {
  const className = `${styles.gradientBtn} ${
    variant === 'fill' ? styles.gradientBtnFill : styles.gradientBtnOutline
  }`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ─── Scroll Reveal ──────────────────────────────────────────
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -60 },
    right: { y: 0, x: 60 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
