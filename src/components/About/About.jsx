'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import { SectionHeading, ScrollReveal } from '@/components/ui';
import styles from './About.module.css';

// ─── Animation Variants ─────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

// ─── About Section ──────────────────────────────────────────
export default function About() {
  const { bio, aboutTraits, aboutProfile, name } = personalInfo;

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading label="Get To Know Me" title="About Me" />

        <div className={styles.layout}>
          {/* ── Left Column: Bio + Traits ── */}
          <div className={styles.leftCol}>
            <ScrollReveal direction="up">
              <p className={styles.bioText}>{bio}</p>
            </ScrollReveal>

            <div className={styles.traitsGrid}>
              {aboutTraits.map((trait, i) => (
                <motion.div
                  key={trait.title}
                  className={styles.traitCard}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={styles.traitIcon}>{trait.icon}</div>
                  <h3 className={styles.traitTitle}>{trait.title}</h3>
                  <p className={styles.traitDesc}>{trait.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Profile Card ── */}
          <ScrollReveal direction="right">
            <div className={styles.profileCard}>
              {/* Avatar */}
              <div className={styles.avatarWrap}>
                <div className={styles.avatarRing}>
                  <span className={styles.avatar}>
                    {name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Experience */}
              <p className={styles.profileSectionLabel}>experience</p>
              <div className={styles.profileEntries}>
                {aboutProfile.experience.map((exp, i) => (
                  <div key={i} className={styles.profileEntry}>
                    <span className={styles.entryArrow}>→</span>
                    <div className={styles.entryInfo}>
                      <span className={styles.entryTitle}>{exp.title}</span>
                      <span className={styles.entrySubtitle}>{exp.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <p className={styles.profileSectionLabel}>education</p>
              <div className={styles.profileEntries}>
                {aboutProfile.education.map((edu, i) => (
                  <div key={i} className={styles.profileEntry}>
                    <span className={styles.entryArrow}>→</span>
                    <div className={styles.entryInfo}>
                      <span className={styles.entryTitle}>{edu.title}</span>
                      <span className={styles.entrySubtitle}>{edu.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <p className={styles.profileSectionLabel}>interests</p>
              <div className={styles.interestTags}>
                {aboutProfile.interests.map((tag) => (
                  <span key={tag} className={styles.interestTag}>{tag}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
