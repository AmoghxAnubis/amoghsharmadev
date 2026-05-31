'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText } from 'lucide-react';
import { SectionHeading } from '@/components/ui';
import styles from './Research.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Research() {
  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHeading label="Publications" title="Research Area" />

        <motion.div
          className={styles.researchGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className={styles.researchCard} variants={cardVariants}>
            <div className={styles.awardBadge}>
              <Award size={20} />
              <span>Best Paper Award</span>
            </div>
            
            <div className={styles.researchContent}>
              <div className={styles.header}>
                <span className={styles.conference}>Springer Conference</span>
                <span className={styles.date}>2024</span>
              </div>
              
              <h3 className={styles.researchTitle}>
                Building the Decentralized Future: Blockchain Innovation with Ethereum at the Core
              </h3>
              
              <p className={styles.researchDesc}>
                This research examines the cost dynamics of data operations within Ethereum smart contracts and their design implications for decentralized application (dApp) design. It provides a quantitative, experiment-based approach to analyze how persistent storage influences gas usage and contract scalability on Ethereum.
              </p>
              
              <div className={styles.tagsRow}>
                <span className={styles.tag}>Blockchain</span>
                <span className={styles.tag}>Ethereum</span>
                <span className={styles.tag}>Web 3.0</span>
                <span className={styles.tag}>Smart Contracts</span>
                <span className={styles.tag}>Gas Cost</span>
              </div>
              
              <div className={styles.researchLinks}>
                <a
                  href="/research paper final .pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.researchLink}
                >
                  <FileText size={16} /> Read Paper
                </a>
                <a
                  href="/research paper certificate.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.researchLink}
                >
                  <Award size={16} /> View Certificate
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
