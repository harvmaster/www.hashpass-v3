interface Service {
    name: string; 
    note?: string;
    legacy: boolean;
    encoding: Encoding;   
    logo?: string;
    domain: string;
    dateAdded: number;
    dateUsed: number;
    timesUsed: number;
  }

enum Encoding {
    BASE_58 = 'base58',
    HEX = 'hex',
    LEGACY = 'legacy'
}

export const services: Service[] = [
    {
        name: 'Amazon',
        note: 'Amazon.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'amazon.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'LinkedIn',
        note: 'LinkedIn.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'linkedin.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Netflix',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'netflix.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1,
        note: 'username: 12345678\n email: mums'
    },
    {
        name: 'PayPal',
        note: 'PayPal.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'paypal.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Facebook',
        note: 'Facebook.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'facebook.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 4
    },
    {
        name: 'GitHub',
        note: 'GitHub.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'github.com',
        dateAdded: 1620000000000,
        dateUsed: 1650000000000,
        timesUsed: 1
    },
    {
        name: 'Google',
        note: 'Google.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'google.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Instagram',
        note: 'Instagram.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        logo: 'https://logo.clearbit.com/instagram.com',
        domain: 'instagram.com',
        dateAdded: 1690000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Reddit',
        note: 'Reddit.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'reddit.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Slack',
        note: 'Slack.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'slack.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Twitter',
        note: 'Twitter.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'twitter.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'YouTube',
        note: 'YouTube.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'youtube.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
    {
        name: 'Coinbase',
        note: 'Coinbase.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'coinbase.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },

    {
        name: 'Discord',
        note: 'Discord.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'discord.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },

    {
        name: 'Dropbox',
        note: 'Dropbox.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'dropbox.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },

    {
        name: 'Etsy',
        note: 'Etsy.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://cdn2.iconfinder.com/data/icons/social-var-1/614/2_-_Facebook-256.png',
        domain: 'etsy.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },

    {
        name: 'Fiverr',
        note: 'Fiverr.com',
        legacy: false,
        encoding: Encoding.BASE_58,
        // logo: 'https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-4.png',
        domain: 'fiverr.com',
        dateAdded: 1620000000000,
        dateUsed: 1620000000000,
        timesUsed: 1
    },
]

export default services