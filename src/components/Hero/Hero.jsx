'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { GradientButton } from '@/components/ui';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/SocialIcons';
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
        setCharIdx((prev) => prev + 1);
        setDisplay(current.slice(0, charIdx + 1));

        if (charIdx + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
      } else {
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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
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
        {/* Badge */}
        <motion.div className={styles.badge} variants={fadeUp}>
          <span className={styles.badgeDot} />
          {personalInfo.badge}
        </motion.div>

        {/* Name */}
        <motion.h1 className={styles.heading} variants={fadeUp}>
          Hi, I&apos;m{' '}
          <span className={styles.gradientName}>{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div className={styles.typewriterRow} variants={fadeUp}>
          <span className={styles.typewriterPrefix}>I build</span>
          <span className={styles.typewriterText}>{typedRole}</span>
          <span className={styles.cursor} aria-hidden="true" />
        </motion.div>

        {/* Bio */}
        <motion.p className={styles.bio} variants={fadeUp}>
          {personalInfo.heroBio}
        </motion.p>

        {/* Tech Pills */}
        <motion.div className={styles.techPills} variants={fadeUp}>
          {personalInfo.heroTechPills.map((tech, index) => (
            <motion.span
              key={tech.name}
              className={styles.pill}
              style={{
                color: tech.color,
                borderColor: `${tech.color}30`,
                backgroundColor: `${tech.color}10`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.06, duration: 0.3 }}
            >
              <span
                className={styles.pillDot}
                style={{ backgroundColor: tech.color }}
              />
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div className={styles.ctas} variants={fadeUp}>
          <GradientButton variant="fill" href="#projects">
            View Projects
            <ArrowRight size={16} className={styles.ctaIcon} />
          </GradientButton>
          <GradientButton variant="outline" href={personalInfo.resumeUrl} target="_blank">
            Resume
            <Download size={16} />
          </GradientButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div className={styles.socials} variants={fadeUp}>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={personalInfo.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Twitter"
          >
            <TwitterIcon size={20} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && handleScrollClick()}
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <div className={styles.mouseIcon} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
