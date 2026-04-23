const axios = require('axios');
const cheerio = require('cheerio');

async function extract(url) {
    // Twitch clips: clips.twitch.tv/ID or twitch.tv/creator/clip/ID
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const title = $('meta[property="og:title"]').attr('content') || 'Twitch Clip';
        const thumbnail = $('meta[property="og:image"]').attr('content') || '';

        // Twitch embeds the initial state in a script tag we can parse.
        // It's complex, so for standard clips, we can often fetch clip metadata using an open API or GQL.
        // Since we cannot use yt-dlp, we will try to find the video metadata directly.
        
        let videoUrl = $('meta[property="og:video"]').attr('content');
        
        if (!videoUrl) {
             throw new Error('Twitch clip extraction required video url not found in meta properties');
        }

        return {
            platform: 'twitch',
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
         throw new Error(`Twitch extraction failed: ${error.message}`);
    }
}

module.exports = { extract };
