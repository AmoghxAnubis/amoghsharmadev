'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { projects } from '@/data/portfolio';
import { SectionHeading, GlassCard } from '@/components/ui';
import styles from './Projects.module.css';

// ─── Filter categories ──────────────────────────────────────
const FILTERS = ['All', 'Frontend', 'ML/AI', 'Blockchain', 'DevOps'];

// ─── Gradient palette for project image placeholders ────────
const GRADIENTS = [
  'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  'linear-gradient(135deg, #1a0533, #2d1b69, #3a1c71)',
  'linear-gradient(135deg, #0a1628, #1e3a5f, #00506b)',
  'linear-gradient(135deg, #1c1c2e, #2a2a4a, #3e1f47)',
  'linear-gradient(135deg, #0d1117, #1a3a2a, #0f4c3a)',
  'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
];

// ─── Animation Variants ─────────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading label="My Work" title="Featured Projects" />

        {/* ── Filter Tabs ── */}
        <div className={styles.filterTabs}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterTab} ${
                activeFilter === filter ? styles.filterTabActive : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Projects Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={styles.projectsGrid}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`${styles.projectCard} ${
                  project.featured ? styles.cardFeatured : ''
                }`}
                variants={cardVariants}
                layout
              >
                <GlassCard
                  className={styles.projectCard}
                  style={{ padding: 0 }}
                  initial={false}
                  whileInView={undefined}
                >
                  {/* ── Image Area ── */}
                  <div className={styles.projectImage}>
                    <div
                      className={styles.projectImageBg}
                      style={{
                        background: GRADIENTS[index % GRADIENTS.length],
                      }}
                    />
                    <div className={styles.projectOverlay}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.overlayBtn}
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <GithubIcon size={20} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.overlayBtn}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className={styles.projectContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                    <div className={styles.tagsRow}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
