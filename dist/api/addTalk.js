"use strict";
const youtubeUrls_1 = require("./youtubeUrls");
function addTalk(url) {
    return new Promise((resolve, reject) => {
        if (youtubeUrls_1.validUrl(url) && youtubeUrls_1.validVideoId(url)) {
            const id = youtubeUrls_1.videoId(url);
            resolve({ id: id });
        }
        else {
            reject(new Error(`The URL ${url} is not valid for YouTube`));
        }
    });
}
exports.addTalk = addTalk;
