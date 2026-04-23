const twitterExtractor = require('./twitter');
const instagramExtractor = require('./instagram');
const twitchExtractor = require('./twitch');
const genericExtractor = require('./generic');

const extractors = [
    {
        name: 'twitter',
        match: /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/i,
        extract: twitterExtractor.extract
    },
    {
        name: 'instagram',
        match: /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_\-]+)/i,
        extract: instagramExtractor.extract
    },
    {
        name: 'twitch',
        match: /clips\.twitch\.tv\/([a-zA-Z0-9_-]+)|twitch\.tv\/.*\/clip\/([a-zA-Z0-9_-]+)/i,
        extract: twitchExtractor.extract
    }
];

async function extract(url) {
    try {
        for (const extractor of extractors) {
            if (extractor.match.test(url)) {
                return await extractor.extract(url);
            }
        }
        
        // Fallback to generic open graph extractor
        return await genericExtractor(url);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    extract
};
