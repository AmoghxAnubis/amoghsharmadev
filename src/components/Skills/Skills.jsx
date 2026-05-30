'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Brain, Cloud, Link, Palette } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui';
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

// ─── Proficiency badge class lookup ──────────────────────
const profClassMap = {
  expert: styles.profExpert,
  proficient: styles.profProficient,
  familiar: styles.profFamiliar,
};

// ─── Animation variants ─────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ─── Skills Section ──────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[0].category);

  const activeCategory = skills.find((s) => s.category === activeTab);
  const activeItems = activeCategory?.items || [];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading
          label="What I Work With"
          title="Tech Stack"
        />

        <p className={styles.sectionSubtitle}>
          Technologies, frameworks, and tools I use to build software
        </p>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          {skills.map((category) => {
            const Icon = iconMap[category.icon];
            const isActive = activeTab === category.category;

            return (
              <button
                key={category.category}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(category.category)}
              >
                {Icon && (
                  <Icon
                    size={16}
                    className={styles.tabIcon}
                  />
                )}
                {category.category}
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.skillsGrid}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {activeItems.map((skill) => (
              <motion.div
                key={skill.name}
                className={styles.skillCard}
                variants={cardVariants}
              >
                {/* Header: Icon + Name */}
                <div className={styles.cardHeader}>
                  <div
                    className={styles.skillAbbr}
                    style={{
                      backgroundColor: `${activeCategory.color}18`,
                      color: activeCategory.color,
                      border: `1px solid ${activeCategory.color}30`,
                    }}
                  >
                    {skill.abbr}
                  </div>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>

                {/* Proficiency Badge */}
                <span className={`${styles.profBadge} ${profClassMap[skill.proficiency] || ''}`}>
                  {skill.proficiency}
                </span>

                {/* Years + Level */}
                <div className={styles.cardStats}>
                  <span className={styles.statLabel}>{skill.years} years</span>
                  <span className={styles.statValue}>{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    style={{ background: activeCategory.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>

                {/* Projects Count */}
                <div className={styles.cardFooter}>
                  <span className={styles.footerLabel}>Projects</span>
                  <span className={styles.footerValue}>{skill.projects}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 3D interactive skill sphere */}
        <div className={styles.orbContainer}>
          <p className={styles.orbLabel}>Interactive Skill Map</p>
          <SkillOrb />
        </div>
      </div>
    </section>
  );
}
