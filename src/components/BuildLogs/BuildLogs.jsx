'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, ScrollReveal } from '@/components/ui';
import { useGitHubData } from './useGitHubData';
import styles from './BuildLogs.module.css';

function Heatmap({ data }) {
  if (!data?.days || data.days.length === 0) return null;
  
  // Group days by weeks (approx)
  const weeks = [];
  let currentWeek = [];
  
  data.days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === data.days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Keep last 52 weeks for display
  const displayWeeks = weeks.slice(-52);

  return (
    <div className={styles.heatmapSection}>
      <p className={styles.heatmapLabel}>contributions_heatmap</p>
      <div className={styles.heatmapWrap}>
        <div className={styles.heatmapGrid}>
          {displayWeeks.map((week, wi) => (
            <div key={wi} className={styles.heatmapCol}>
              {week.map((day, di) => {
                let opacity = 0.1;
                if (day.count > 0) opacity = 0.3;
                if (day.count > 3) opacity = 0.6;
                if (day.count > 6) opacity = 1;
                
                return (
                  <div
                    key={di}
                    className={styles.heatmapCell}
                    style={{ background: day.count > 0 ? `rgba(255, 255, 255, ${opacity})` : 'rgba(255, 255, 255, 0.05)' }}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BuildLogs() {
  const { events, contributions, loading, error } = useGitHubData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.repo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="build-logs" className="section">
      <div className="container">
        
        <div className={styles.headerArea}>
          <div className={styles.titleRow}>
            <h2 className={styles.mainTitle}>
              <span className={styles.hash}>#</span> Build Logs <span className={styles.prompt}>&gt;_</span>
            </h2>
            <a href="https://github.com/AmoghxAnubis" target="_blank" rel="noopener noreferrer" className={styles.viewAllBtn}>
              View GitHub &rarr;
            </a>
          </div>
          <p className={styles.descText}>
            Raw, unfiltered updates from my development journey. These build logs document the real process of shipping products, with all the challenges and victories along the way.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filtersRow}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Search logs..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.selectWrapper}>
            <select className={styles.selectInput}>
              <option>All Projects</option>
            </select>
          </div>
          <div className={styles.selectWrapper}>
            <select className={styles.selectInput}>
              <option>All Status</option>
              <option>completed</option>
              <option>merged</option>
              <option>open</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.skeleton} style={{ height: 100, marginBottom: 16 }}></div>
            <div className={styles.skeleton} style={{ height: 100, marginBottom: 16 }}></div>
            <div className={styles.skeleton} style={{ height: 100 }}></div>
          </div>
        ) : error ? (
          <div className={styles.error}>Failed to load GitHub data: {error}</div>
        ) : (
          <>
            {/* Stats */}
            {contributions && (
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{contributions.total}</div>
                  <div className={styles.statLabel}>Total Commits</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{contributions.longestStreak}</div>
                  <div className={styles.statLabel}>Longest Streak</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{contributions.currentStreak}</div>
                  <div className={styles.statLabel}>Current Streak</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{events.length}</div>
                  <div className={styles.statLabel}>Recent Events</div>
                </div>
              </div>
            )}

            {/* Heatmap */}
            <Heatmap data={contributions} />

            {/* Logs Feed */}
            <div className={styles.feedHeader}>
              <p className={styles.feedTitle}>activity_feed</p>
            </div>

            <div className={styles.logsList}>
              {filteredEvents.map((log, i) => (
                <ScrollReveal key={log.id} direction="up" delay={i * 0.05}>
                  <a href={log.url} target="_blank" rel="noopener noreferrer" className={styles.logCard}>
                    <div className={styles.logMeta}>
                      <span className={styles.logDate}>
                        🗓️ {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className={`${styles.logStatus} ${
                        log.status === 'completed' ? styles.statusCompleted :
                        log.status === 'merged' ? styles.statusMerged :
                        styles.statusOpen
                      }`}>
                        {log.status} {log.repo.split('/')[1]}
                      </span>
                    </div>
                    
                    <h3 className={styles.logTitle}>{log.title}</h3>
                    <p className={styles.logDesc}>{log.description}</p>
                    
                    <div className={styles.logTags}>
                      {log.tags.map(tag => (
                        <span key={tag} className={styles.logTag}>{tag}</span>
                      ))}
                    </div>
                  </a>
                </ScrollReveal>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className={styles.loading}>No logs found matching your criteria.</div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
