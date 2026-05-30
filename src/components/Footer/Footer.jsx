'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          &copy; {currentYear} {personalInfo.name}. All rights reserved.
        </p>

        <p className={styles.tagline}>
          Built with Next.js &amp; ☕
        </p>

        <div className={styles.socialLinks}>
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={personalInfo.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
