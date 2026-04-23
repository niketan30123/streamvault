const express = require('express');
const router = express.Router();
const extractorRegistry = require('../extractors/index');
const axios = require('axios');

router.post('/analyze', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Find the appropriate extractor
        const extractParams = await extractorRegistry.extract(url);
        res.json(extractParams);
    } catch (error) {
        console.error('Extraction error:', error.message);
        res.status(500).json({ error: 'Failed to extract video details', details: error.message });
    }
});

router.get('/download', async (req, res) => {
    const { url, title } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Video URL is required' });
    }

    try {
        // Stream the video through our backend
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        });

        const safeTitle = (title || 'video').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.mp4"`);
        res.setHeader('Content-Type', response.headers['content-type'] || 'video/mp4');

        response.data.pipe(res);
    } catch (error) {
        console.error('Download proxy error:', error.message);
        res.status(500).send('Failed to proxy download');
    }
});

module.exports = router;
