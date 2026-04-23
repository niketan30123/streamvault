import { motion } from 'framer-motion';
import { DownloadCloud } from 'lucide-react';

export default function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginBottom: '3rem' }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-flex', marginBottom: '1rem', color: '#8b5cf6' }}
      >
        <DownloadCloud size={48} />
      </motion.div>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: '1.2' }}>
        Universal <span className="heading-gradient">Video Downloader</span>
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
        Download videos from Twitter, Instagram, Twitch & More — Ad-Free, Fast, and Secure.
      </p>
    </motion.div>
  );
}
