'use client';

import { useState } from 'react';
import { Music } from 'lucide-react';
import styles from './SpotifyPlayer.module.css';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className={styles.floatingBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Music Player"
        title="Toggle Music Player"
      >
        <Music size={20} />
      </button>

      <div className={`${styles.playerWrapper} ${isOpen ? styles.open : ''}`}>
        <iframe
          style={{ borderRadius: '12px', background: 'transparent' }}
          src="https://open.spotify.com/embed/track/1ijHcjfc6P1sOgXKFuJNDk?utm_source=generator&theme=0"
          width="300"
          height="80"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
