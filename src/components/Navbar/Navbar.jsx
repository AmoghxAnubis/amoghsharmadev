'use client';

import { useState, useEffect, useRef } from 'react';
import { Home, User, Layers, FolderKanban, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { navLinks } from '@/data/portfolio';
import styles from './Navbar.module.css';

// Map section IDs to icons and labels
const navItems = [
  { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'skills', label: 'Skills', icon: Layers, href: '#skills' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, href: '#projects' },
  { id: 'experience', label: 'Experience', icon: Briefcase, href: '#experience' },
  { id: 'education', label: 'Education', icon: GraduationCap, href: '#education' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  // Show/hide based on hero scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setVisible(window.scrollY > heroBottom - 200);
      } else {
        setVisible(window.scrollY > window.innerHeight * 0.6);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveSection(topEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.05 }
    );

    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      className={`${styles.sideNav} ${visible ? styles.sideNavVisible : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            aria-label={item.label}
            aria-current={isActive ? 'true' : undefined}
          >
            <Icon className={styles.navIcon} strokeWidth={isActive ? 2.5 : 1.5} />
            <span className={styles.tooltip}>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
