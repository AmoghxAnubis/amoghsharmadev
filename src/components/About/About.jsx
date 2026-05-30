'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { SectionHeading, GlassCard, ScrollReveal } from '@/components/ui';
import styles from './About.module.css';

// ─── Animated Counter ───────────────────────────────────────
function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(motionVal, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
    }
  }, [isInView, motionVal, value]);

  return (
    <GlassCard className={styles.statCard}>
      <div className={styles.statValue} ref={ref}>
        <motion.span>{rounded}</motion.span>
        <span>+</span>
      </div>
      <p className={styles.statLabel}>{label}</p>
    </GlassCard>
  );
}

// ─── About Section ──────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading label="Get To Know Me" title="About Me" />

        {/* Split layout: bio + photo */}
        <div className={styles.grid}>
          {/* Left — Bio text */}
          <ScrollReveal direction="left">
            <p className={styles.bioText}>{personalInfo.bio}</p>
          </ScrollReveal>

          {/* Right — Stylized photo frame */}
          <ScrollReveal direction="right">
            <div className={styles.photoFrame}>
              <div className={styles.photoFrameInner}>
                <span className={styles.photoPlaceholderText}>Photo</span>
              </div>
              <div className={styles.glowOrb} />
            </div>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <div className={styles.statsGrid}>
          {personalInfo.stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
