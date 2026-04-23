import { motion } from 'framer-motion';
import { Globe, Video, User } from 'lucide-react';


export default function VideoPreview({ metadata }) {
  if (!metadata) return null;

  const { title, thumbnail, platform } = metadata;

  const renderIcon = () => {
    switch (platform) {
      case 'twitter': return <Globe size={14} color="#1DA1F2" />;
      case 'instagram': return <User size={14} color="#E1306C" />;
      case 'twitch': return <Video size={14} color="#9146FF" />;
      default: return <Video size={14} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}
    >
      <div style={{ flex: '0 0 250px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--input-bg)' }}>
        {thumbnail ? (
           <img src={thumbnail} alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16/9' }} />
        ) : (
           <div style={{ width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
               <Video size={48} />
           </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'inline-flex', marginBottom: '1rem' }} className="badge">
           {renderIcon()}
           <span style={{ textTransform: 'capitalize' }}>{platform}</span>
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
