const axios = require('axios');

async function test() {
    try {
        const { data } = await axios.get('https://vxtwitter.com/Twitter/status/1710098487963385966', {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)' }
        });
        console.log(data);
    } catch(e) {
        console.log('Error:', e.message);
    }
}
test();
