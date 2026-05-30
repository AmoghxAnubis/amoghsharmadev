'use client';

import { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import styles from './SpotifyPlayer.module.css';

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/A Pack Of Cigarette$.mp3" 
        preload="auto"
      />
      <button 
        className={`${styles.floatingBtn} ${isPlaying ? styles.playing : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </>
  );
}
