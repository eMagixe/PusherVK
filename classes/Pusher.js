module.exports = class Pusher {
    constructor(account, owner) {
        this.account = account;
        this.owner = owner;
        this.pushed_links = new Set();
    }
    start = async (SiteType) => {
        let site = new SiteType;
        let url = await site.getLink();
        if (url !== SiteType.current_url || SiteType.current_url === null || !this.pushed_links.has(url)) {
            this.pushed_links.add(url);
            SiteType.current_url = url;
            this.account.postInWall(this.owner, url);
            return { name: site.name, status: true };
        } else {
            return { name: site.name, status: false };
        }
    }
}