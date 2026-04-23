const genericExtractor = require('./generic');

async function extract(url) {
    try {
        // Direct scraping instagram is heavily protected. 
        // We will try simple generic scraping and modify link just in case.
        // There are open source endpoints like ddinstagram for fetching metadata, similar to vxtwitter.
        const urlObj = new URL(url);
        urlObj.hostname = 'ddinstagram.com';
        
        // This is a typical workaround for public reels without API keys
        const dlUrl = urlObj.toString();
        
        // We fall back to generic but with ddinstagram host.
        const genericResult = await genericExtractor(dlUrl);
        genericResult.platform = 'instagram';
        
        return genericResult;
    } catch (error) {
        throw new Error(`Instagram extraction failed (may require public reel or login): ${error.message}`);
    }
}

module.exports = { extract };
