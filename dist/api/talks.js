"use strict";
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const youtubeUrls_1 = require("./youtubeUrls");
const loadFileTable = (path) => {
    const jsonFiles = fs_1.readdirSync(path).filter((file) => file.endsWith('.json'));
    const idFilePairs = jsonFiles.map(file => fs_1.readFileSync(`repo/${file}`, 'utf-8'))
        .map(contents => JSON.parse(contents))
        .map(metadata => [metadata.id, `repo/${metadata.title}.ogg`]);
    return new Map(idFilePairs);
};
const extractAudio = (id) => new Promise((resolve, reject) => {
    const downloaderProcess = child_process_1.spawn("youtube-dl", ["-x", "--audio-format", "vorbis", "-o", "repo/%(title)s.%(ext)s", "--write-info-json", youtubeUrls_1.genUrl(id)]);
    downloaderProcess.stdout.on('data', (data) => {
        console.warn(data.toString());
    });
    downloaderProcess.stderr.on('data', (data) => {
        console.warn(data.toString());
    });
    downloaderProcess.on('exit', (code) => {
        if (code === 0) {
            const filenameTest = child_process_1.spawnSync("youtube-dl", ["--get-filename", youtubeUrls_1.genUrl(id)]);
            fileTable.set(id, filenameTest.stdout.toString());
            resolve({ id: id });
        }
        else {
            reject(new Error("While downloading & extracting, something bad happened"));
        }
    });
});
const fileTable = loadFileTable('./repo/');
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
function getTalk(id) {
    return new Promise((resolve, reject) => {
        if (fileTable.has(id)) {
            const file = fileTable.get(id);
            resolve({
                path: file,
                name: file.substring(4)
            });
        }
        else {
            reject(new Error('Unable to locate video with ID ' + id));
        }
    });
}
exports.getTalk = getTalk;
;
