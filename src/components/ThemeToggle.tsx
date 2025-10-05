import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden border-2 hover:scale-105 transition-all duration-200"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotateY: isDark ? 180 : 0,
          scale: isDark ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-4 h-4 text-yellow-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotateY: isDark ? 0 : 180,
          scale: isDark ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-4 h-4 text-blue-500" />
      </motion.div>
      <span className="opacity-0 w-8 h-4">
        {isDark ? 'شب' : 'روز'}
      </span>
    </Button>
  );
}