'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Monitor, Server, Brain, Cloud, Link, Palette } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { SectionHeading, GlassCard } from '@/components/ui';
import styles from './Skills.module.css';

// Dynamically import the 3D orb (no SSR — it needs WebGL / window)
const SkillOrb = dynamic(() => import('./SkillOrb'), { ssr: false });

// ─── Icon lookup by name string ──────────────────────────
const iconMap = {
  Monitor,
  Server,
  Brain,
  Cloud,
  Link,
  Palette,
};

// ─── Stagger animation variants ─────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Single progress bar (animates width on scroll entry) ─
function SkillBar({ name, level, color }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillInfo}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

// ─── Skills Section ──────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          label="What I Work With"
          title="Skills & Technologies"
        />

        <motion.div
          className={styles.skillsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {skills.map((category) => {
            const Icon = iconMap[category.icon];

            return (
              <motion.div key={category.category} variants={cardVariants}>
                <GlassCard>
                  <div className={styles.cardHeader}>
                    <div
                      className={styles.iconWrap}
                      style={{ background: `${category.color}20` }}
                    >
                      {Icon && <Icon size={22} color={category.color} />}
                    </div>
                    <h3 className={styles.categoryName}>
                      {category.category}
                    </h3>
                  </div>

                  {category.items.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                    />
                  ))}
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3D interactive skill sphere */}
        <div className={styles.orbContainer}>
          <p className={styles.orbLabel}>Interactive Skill Map</p>
          <SkillOrb />
        </div>
      </div>
    </section>
  );
}
