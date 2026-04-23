const axios = require('axios');
const cheerio = require('cheerio');

async function extract(url) {
    try {
        const match = url.match(/(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/i);
        if (!match) throw new Error('Invalid Twitter URL');
        
        const username = match[1];
        const tweetId = match[3];
        const dlUrl = `https://vxtwitter.com/${username}/status/${tweetId}`;

        // Emulate DiscordBot to receive the open graph embed tags without running Javascript
        const { data } = await axios.get(dlUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)'
            }
        });

        const $ = cheerio.load(data);
        
        const title = $('meta[property="og:title"]').attr('content') || 'Twitter Video';
        let videoUrl = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:url"]').attr('content') || $('meta[property="og:video:secure_url"]').attr('content');
        const thumbnail = $('meta[property="og:image"]').attr('content') || '';

        // Some tweets do not have a video, only images, or the tweet is protected.
        if (!videoUrl) {
           throw new Error('No video found. Tweet might be protected, contain no media, or external scraping is being blocked.');
        }

        return {
            platform: 'twitter',
            title: title,
            thumbnail: thumbnail,
            formats: [
                {
                    quality: 'auto',
                    url: videoUrl,
                    ext: 'mp4'
                }
            ]
        };

    } catch (error) {
        throw new Error(`Twitter extraction failed: ${error.message}`);
    }
}

module.exports = { extract };
