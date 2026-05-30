'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

const helloWords = [
  "Hello",        // English
  "Bonjour",      // French
  "Hola",         // Spanish
  "Ciao",         // Italian
  "Olá",          // Portuguese
  "こんにちは",   // Japanese
  "你好",         // Chinese
  "안녕하세요",   // Korean
  "Hallo",        // German
  "Namaste",      // Hindi
];

export default function Loader() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (index === helloWords.length - 1) {
      // After reaching the last word, wait a bit then hide the loader
      const finishTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1200); // Hold the last word briefly (increased)
      return () => clearTimeout(finishTimeout);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 400); // Slowed down from 200ms to 400ms per word

    return () => clearTimeout(interval);
  }, [index]);

  return (
    <div className={`${styles.loaderContainer} ${!isLoading ? styles.hidden : ''}`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={styles.helloText}
          >
            {helloWords[index]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
