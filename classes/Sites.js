const cheerio = require('cheerio');
const axios = require('axios');

class Site {
    constructor(number_link) {
        this.number_link = number_link;
    }
    async getLink() {
        let body = await axios.get(this.name + this.parsed_url).then(response => response.data);
        const $ = cheerio.load(body);
        let parsed = $(this.search_tag);
        return this.name + parsed[this.number_link].attribs.href;
    }
}

class Elle extends Site {
    static current_url = null;
    constructor() {
        super(0);
        this.name = 'https://www.elle.ru';
        this.search_tag = 'a.announce-text-under-image';
        this.parsed_url = '/moda/novosty/';
    }
}

class Vogue extends Site {
    static current_url = null;
    constructor() {
        super(0);
        this.name = 'https://www.vogue.ru';
        this.search_tag = '[data-test-id="Hed"]';
        this.parsed_url = '/fashion/news';
    }
}

class FashionUnited extends Site {
    static current_url = null;
    constructor() {
        super(2);
        this.name = 'https://fashionunited.ru';
        this.search_tag = '[itemprop="url"]';
        this.parsed_url = '/novostee/moda/';
    }
}

module.exports = { Elle, Vogue, FashionUnited };