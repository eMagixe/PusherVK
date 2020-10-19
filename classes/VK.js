const easyvk = require('easyvk');
const path = require('path');

module.exports = class VK {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    postInWall = (owner_id, link) => {
        easyvk({
            username: this.username,
            password: this.password,
            sessionFile: path.join(__dirname, '.my-session')
        }).then(async vk => {
            let vkr = await vk.call('wall.post', {
                owner_id: owner_id,
                message: '',
                attachments: link,
                random_id: easyvk.randomId()
            });
            console.log(`Post #${vkr.post_id}. Push link: `, link);
        });
    }
}