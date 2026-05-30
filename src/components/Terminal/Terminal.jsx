'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { terminalCommands, personalInfo } from '@/data/portfolio';
import styles from './Terminal.module.css';

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new command
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const fireConfetti = async () => {
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#60A5FA', '#A78BFA', '#93C5FD', '#C4B5FD', '#E2E8F0'],
      });
    } catch (e) {
      // silently fail if confetti can't load
    }
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'resume') {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: '📄 Opening resume...', type: 'success' },
      ]);
      window.open(personalInfo.resumeUrl, '_blank');
      return;
    }

    if (trimmed === 'sudo hire amogh') {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output:
            "🎉 Congratulations! You've made the right choice!\n\nAmogh has been hired! 🚀\nStarting onboarding sequence...\n\n[████████████████████] 100%\n\n✅ Welcome aboard!",
          type: 'success',
        },
      ]);
      fireConfetti();
      return;
    }

    if (terminalCommands[trimmed]) {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: terminalCommands[trimmed].output },
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output: `Command not found: ${cmd}\nType 'help' for available commands.`,
        type: 'error',
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`${styles.toggleBtn} ${!isOpen ? styles.toggleBtnPulse : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
      >
        <span className={styles.toggleIcon}>{isOpen ? '✕' : '>_'}</span>
      </button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.terminalHeader}>
              <div className={styles.headerDots}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <span className={styles.terminalTitle}>amogh@portfolio:~$</span>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close terminal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className={styles.terminalBody} ref={bodyRef}>
              <div className={styles.welcomeMsg}>
                Welcome to Amogh&apos;s terminal! 🖥️{'\n'}
                Type &apos;help&apos; to see available commands.
              </div>

              {history.map((entry, index) => (
                <div key={index} className={styles.terminalEntry}>
                  <div className={styles.commandLine}>
                    <span className={styles.commandPrompt}>$ </span>
                    {entry.command}
                  </div>
                  <div
                    className={`${styles.commandOutput} ${
                      entry.type === 'error'
                        ? styles.errorOutput
                        : entry.type === 'success'
                        ? styles.successOutput
                        : ''
                    }`}
                  >
                    {entry.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className={styles.inputLine}>
              <span className={styles.inputPrompt}>$</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
