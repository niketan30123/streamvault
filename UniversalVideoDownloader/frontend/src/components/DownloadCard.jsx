import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';

export default function DownloadCard({ metadata, onDownload }) {
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!metadata || !metadata.formats || metadata.formats.length === 0) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    const format = metadata.formats[selectedFormat];
    
    try {
      await onDownload(format.url, metadata.title);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Quality / Format:</span>
        <select 
          className="dropdown" 
          value={selectedFormat} 
          onChange={(e) => setSelectedFormat(Number(e.target.value))}
        >
          {metadata.formats.map((format, idx) => (
            <option key={idx} value={idx}>
              {format.quality} ({format.ext})
            </option>
          ))}
        </select>
      </div>

      <button 
        className="btn-primary" 
        onClick={handleDownload} 
        disabled={isDownloading || downloaded}
        style={{ backgroundColor: downloaded ? 'var(--success)' : undefined }}
      >
        {isDownloading ? (
          <><div className="loader"></div> Downloading...</>
        ) : downloaded ? (
          <><CheckCircle size={20} /> Success!</>
        ) : (
          <><Download size={20} /> Download</>
        )}
      </button>
    </motion.div>
  );
}
