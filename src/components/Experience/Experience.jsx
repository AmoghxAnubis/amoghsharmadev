'use client';

import { experience } from '@/data/portfolio';
import { SectionHeading, ScrollReveal } from '@/components/ui';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading
          label="Where I've Worked"
          title="Experience"
        />

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experience.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelineNode} />
              <ScrollReveal
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.15}
              >
                <div className={styles.timelineCard}>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.company}>{item.company}</p>
                  <p className={styles.period}>{item.period}</p>
                  <p className={styles.description}>{item.description}</p>
                  <ul className={styles.highlights}>
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
