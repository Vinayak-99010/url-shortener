
const express = require('express');
const redis = require('redis');
const shortid = require('shortid');
const app = express();
app.use(express.json());

const client = redis.createClient({ url: 'redis://redis:6379' });
client.connect();

app.post('/shorten', async (req, res) => {
    const longUrl = req.body.url;
    const shortCode = shortid.generate();
    await client.set(shortCode, longUrl);
    res.json({ short: \`http://localhost:5000/\${shortCode}\` });
});

app.get('/:code', async (req, res) => {
    const url = await client.get(req.params.code);
    if (url) res.redirect(url);
    else res.status(404).send("Not found");
});

app.listen(5000, () => console.log("Backend running on port 5000"));
