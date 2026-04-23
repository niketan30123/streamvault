import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Search } from 'lucide-react';

export default function UrlInput({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (text.startsWith('http')) {
        onSubmit(text);
      }
    } catch (err) {
      console.log('Clipboard access denied', err);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="glass-panel"
      style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <Link2 
          size={20} 
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
        />
        <input
          type="url"
          className="input-field"
          placeholder="Paste video URL here..."
          style={{ paddingLeft: '3rem' }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button 
        type="button" 
        onClick={handlePaste} 
        style={{ 
          background: 'transparent', 
          border: '1px solid var(--glass-border)', 
          color: 'var(--text-main)', 
          padding: '0.9rem',
          borderRadius: '12px',
          cursor: 'pointer'
        }}
        title="Paste from clipboard"
      >
         Paste
      </button>
      <button type="submit" className="btn-primary" disabled={isLoading || !url}>
        {isLoading ? <div className="loader"></div> : <><Search size={20} /> Analyze</>}
      </button>
    </motion.form>
  );
}
