import { motion } from 'framer-motion';
import { Clock, ExternalLink } from 'lucide-react';

export default function History({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ marginTop: '3rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
        <Clock size={18} />
        <h4 style={{ fontSize: '1rem', fontWeight: '500' }}>Recent Downloads</h4>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {history.map((item, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--input-bg)', flexShrink: 0 }}>
               {item.thumbnail && <img src={item.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
             </div>
             <div style={{ overflow: 'hidden' }}>
               <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                 {item.title}
               </p>
               <span className="badge" style={{ display: 'inline-block', fontSize: '0.7rem' }}>
                 {item.platform}
               </span>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
