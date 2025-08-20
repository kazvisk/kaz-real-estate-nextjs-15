import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  playOnce?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  words,
  className,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  playOnce = false
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (playOnce && done) return;
    const currentWord = words[currentWordIndex];
    if (!isDeleting) {
      // Typing animation
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        if (playOnce) {
          setDone(true);
          return;
        }
        // Pause before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting animation
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, pauseTime, playOnce, done]);

  useEffect(() => {
    if (playOnce) {
      setCurrentText('');
      setIsDeleting(false);
      setDone(false);
      setCurrentWordIndex(0);
    }
  }, [playOnce, words]);

  return (
    <span className={cn("inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="inline-block"
        >
          {currentText}
          <span style={{
            animation: 'blink 1.5s infinite',
            animationTimingFunction: 'step-end'
          }}>|</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};