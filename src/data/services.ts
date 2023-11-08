enum Encoding {
    BASE_58 = 'base58',
    HEX = 'hex',
    LEGACY = 'legacy'
}

const services = [
    {
        "name": "Amazon",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "amazon.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "LinkedIn",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "linkedin.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Netflix",
        "legacy": false,
        "encoding": "base58",
        "domain": "netflix.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1,
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        }
    },
    {
        "name": "PayPal",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "paypal.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Facebook",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "logo": "https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png",
        "domain": "facebook.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 4
    },
    {
        "name": "GitHub",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "github.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Google",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "google.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Instagram",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "logo": "https://logo.clearbit.com/instagram.com",
        "domain": "instagram.com",
        "dateAdded": 1690000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Reddit",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "reddit.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Slack",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "slack.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Twitter",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "twitter.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "YouTube",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "youtube.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Coinbase",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "coinbase.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Discord",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "discord.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Dropbox",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "dropbox.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Etsy",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "etsy.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "Fiverr",
        "note": {
            "username": "testUsername",
            "email": "test@email.com",
            "other": "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum voluptates."
        },
        "legacy": false,
        "encoding": "base58",
        "domain": "fiverr.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1620000000000,
        "timesUsed": 1
    },
    {
        "name": "GoDaddy",
        "legacy": false,
        "encoding": "base58",
        "domain": "godaddy.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Apple",
        "legacy": false,
        "encoding": "base58",
        "domain": "apple.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Spotify",
        "legacy": false,
        "encoding": "base58",
        "domain": "Spotify.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Steam",
        "legacy": false,
        "encoding": "base58",
        "domain": "steamapp.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Teamsepeak",
        "legacy": false,
        "encoding": "base58",
        "domain": "teamspeak.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "Binance",
        "legacy": false,
        "encoding": "base58",
        "domain": "binance.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "CoinMarketCap",
        "legacy": false,
        "encoding": "base58",
        "domain": "coinmarketcap.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "CoinGecko",
        "legacy": false,
        "encoding": "base58",
        "domain": "coingecko.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },
    {
        "name": "CoinMarketCal",
        "legacy": false,
        "encoding": "base58",
        "domain": "coinmarketcal.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },

    {
        "name": "CoinTelegraph",
        "legacy": false,
        "encoding": "base58",
        "domain": "cointelegraph.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 1
    },

    {
        "name": "CoinDesk",
        "legacy": false,
        "encoding": "base58",
        "domain": "coindesk.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 2
    },

    {
        "name": "CoinbasePro",
        "legacy": false,
        "encoding": "base58",
        "domain": "pro.coinbase.com",
        "dateAdded": 1620000000000,
        "dateUsed": 1650000000000,
        "timesUsed": 2
    },
]
export default services