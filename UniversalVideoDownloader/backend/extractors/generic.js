const axios = require('axios');
const cheerio = require('cheerio');

async function extract(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        
        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Generic Video';
        const thumbnail = $('meta[property="og:image"]').attr('content') || '';
        let videoUrl = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:secure_url"]').attr('content');

        if (!videoUrl) {
           const videoSource = $('video source').attr('src');
           const videoTag = $('video').attr('src');
           videoUrl = videoSource || videoTag;
        }

        if (!videoUrl) {
            throw new Error('Could not find video URL on this page.');
        }

        return {
            platform: 'generic',
            title,
            thumbnail,
            formats: [
                {
                    quality: 'auto',
                    url: videoUrl,
                    ext: 'mp4'
                }
            ]
        };

    } catch (error) {
        throw new Error(`Generic extraction failed: ${error.message}`);
    }
}

module.exports = extract;
