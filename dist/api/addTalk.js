"use strict";
const youtubeUrls_1 = require("./youtubeUrls");
const child_process_1 = require("child_process");
const extractAudio = (id) => new Promise((resolve, reject) => {
    const downloaderProcess = child_process_1.spawn("youtube-dl", ["-x", "-o", "repo/%(title)s.%(ext)s", "--write-info-json", youtubeUrls_1.genUrl(id)]);
    downloaderProcess.stdout.on('data', (data) => {
        console.warn(data.toString());
    });
    downloaderProcess.stderr.on('data', (data) => {
        console.warn(data.toString());
    });
    downloaderProcess.on('exit', (code) => {
        if (code === 0) {
            resolve({ id: id });
        }
        else {
            reject(new Error("While downloading & extracting, something bad happened"));
        }
    });
});
function addTalk(url) {
    return new Promise((resolve, reject) => {
        if (youtubeUrls_1.validUrl(url) && youtubeUrls_1.validVideoId(url)) {
            extractAudio(youtubeUrls_1.videoId(url)).then(results => resolve(results));
        }
        else {
            reject(new Error(`The URL ${url} is not valid for YouTube`));
        }
    });
}
exports.addTalk = addTalk;
;
