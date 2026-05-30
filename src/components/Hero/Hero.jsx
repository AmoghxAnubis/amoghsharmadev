'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { GradientButton } from '@/components/ui';
import ParticleField from './ParticleField';
import styles from './Hero.module.css';

// ─── Typewriter Hook ────────────────────────────────────────
function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 50, pauseMs = 1800 } = {}) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const current = words[wordIdx];

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        setCharIdx((prev) => prev + 1);
        setDisplay(current.slice(0, charIdx + 1));

        if (charIdx + 1 === current.length) {
          // Finished typing — pause then delete
          setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
      } else {
        // Deleting
        setCharIdx((prev) => prev - 1);
        setDisplay(current.slice(0, charIdx - 1));

        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
          return;
        }
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [words, wordIdx, charIdx, isDeleting, typeSpeed, deleteSpeed, pauseMs]);

  return display;
}

// ─── Animation Variants ─────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Hero Component ─────────────────────────────────────────
export default function Hero() {
  const typedRole = useTypewriter(personalInfo.roles);

  const handleScrollClick = useCallback(() => {
    const next = document.getElementById('about') || document.getElementById('skills');
    next?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Particle Background */}
      <div className={styles.particles}>
        <ParticleField />
      </div>

      {/* Floating Decorations */}
      <div className={`${styles.decoration} ${styles.decoration1}`} aria-hidden="true" />
      <div className={`${styles.decoration} ${styles.decoration2}`} aria-hidden="true" />
      <div className={`${styles.decoration} ${styles.decoration3}`} aria-hidden="true" />

      {/* Main Content */}
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.h1 className={styles.greeting} variants={fadeUp}>
          Hi, I&apos;m{' '}
          <span className={styles.gradientName}>{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div className={styles.typewriterRow} variants={fadeUp}>
          <span className={styles.typewriterText}>{typedRole}</span>
          <span className={styles.cursor} aria-hidden="true" />
        </motion.div>

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={fadeUp}>
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div className={styles.ctas} variants={fadeUp}>
          <GradientButton variant="fill" href="#projects">
            View Projects
          </GradientButton>
          <GradientButton variant="outline" href="#contact">
            Get in Touch
          </GradientButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && handleScrollClick()}
      >
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.chevron} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
