import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './components/Hero';
import UrlInput from './components/UrlInput';
import VideoPreview from './components/VideoPreview';
import DownloadCard from './components/DownloadCard';
import History from './components/History';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('download_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setError('');
    setMetadata(null);

    try {
      // Connects to local express server
      const { data } = await axios.post('http://localhost:5000/api/analyze', { url });
      setMetadata(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to analyze URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (downloadUrl, title) => {
    try {
      // Proxy download through backend to avoid CORS and get an attachment
      const response = await axios({
        url: `http://localhost:5000/api/download`,
        method: 'GET',
        responseType: 'blob',
        params: {
          url: downloadUrl,
          title: title
        }
      });
      
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'video'}.mp4`);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();

      // Add to history
      const newHistory = [
        { title: metadata.title, thumbnail: metadata.thumbnail, platform: metadata.platform },
        ...history.filter(h => h.title !== metadata.title).slice(0, 9) // Keep last 10
      ];
      setHistory(newHistory);
      localStorage.setItem('download_history', JSON.stringify(newHistory));

    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to download video. It might be protected or the link expired.');
    }
  };

  return (
    <div className="app-container">
      <Hero />
      <UrlInput onSubmit={handleAnalyze} isLoading={isLoading} />
      
      {error && (
        <div className="glass-panel" style={{ color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.3)', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {metadata && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <VideoPreview metadata={metadata} />
          <DownloadCard metadata={metadata} onDownload={handleDownload} />
        </div>
      )}

      <History history={history} />
    </div>
  );
}

export default App;
