'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { education, certifications } from '@/data/portfolio';
import { SectionHeading, GlassCard, ScrollReveal } from '@/components/ui';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading
          label="Background"
          title="Education & Certifications"
        />

        {education.map((edu, index) => (
          <ScrollReveal key={index} direction="up">
            <GlassCard>
              <div className={styles.educationCard}>
                <div className={styles.eduHeader}>
                  <div className={styles.eduIcon}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                  </div>
                </div>

                <div className={styles.eduMeta}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} />
                    {edu.year}
                  </span>
                  <span className={styles.metaItem}>
                    GPA: {edu.gpa}
                  </span>
                </div>

                <ul className={styles.eduHighlights}>
                  {edu.highlights.map((item, i) => (
                    <li key={i} className={styles.eduHighlightItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}

        <h3 className={styles.certsHeading}>Certifications</h3>

        <div className={styles.certsGrid}>
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className={styles.certCard}>
                <Award size={24} className={styles.certIcon} />
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certIssuer}>{cert.issuer}</span>
                <span className={styles.certYear}>{cert.year}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
