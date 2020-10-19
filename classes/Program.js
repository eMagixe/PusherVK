const VK = require('./VK');
const Pusher = require('./Pusher');
const cron = require('cron');
const dayjs = require('dayjs');

let CronJob = cron.CronJob;

module.exports = class Program {
    constructor(env) {
        let { USERNAME, PASSWORD, GROUP_ID } = env;
        this.pusher = new Pusher(
            new VK(
                USERNAME,
                PASSWORD
            ),
            GROUP_ID
        );
        this.sites = [];
    }
    setSites = (sites) => {
        this.sites = sites;
    }
    pushing = () => {
        this.sites.forEach(async SiteType => {
            let response = await this.pusher.start(SiteType);
            if (response.status) {
                console.log(`${response.name} pushing in group wall.`);
            } else {
                console.log(`Site ${response.name} data has not changed: `, dayjs().format('YYYY-MM-DD HH:mm:ss'));
            }
        });
    }
    start = () => {
        let job = new CronJob('0 */30 * * * *', () => {
            this.pushing();
        }, null, true, 'Europe/Moscow');
        job.start();
        console.log('Cron start...');
    }
}