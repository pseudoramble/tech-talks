"use strict";
const url_1 = require("url");
const videoIdRegex = /^[A-Za-z0-9]+$/;
const parseUrl = (url) => url_1.parse(url, true);
const validUrl = (url) => {
    const parsedUrl = parseUrl(url);
    return parsedUrl.host.endsWith('youtube.com') || parsedUrl.host.endsWith('youtu.be');
};
exports.validUrl = validUrl;
const validVideoId = (url) => {
    const parsedUrl = parseUrl(url);
    if (parsedUrl.host.endsWith('youtube.com')) {
        return parsedUrl.query && parsedUrl.query.v && videoIdRegex.test(parsedUrl.query.v);
    }
    else if (parsedUrl.host.endsWith('youtu.be')) {
        return parsedUrl.path && videoIdRegex.test(parsedUrl.path.substring(1));
    }
};
exports.validVideoId = validVideoId;
const videoId = (url) => {
    const parsedUrl = parseUrl(url);
    if (parsedUrl.host.endsWith('youtube.com')) {
        return parsedUrl.query.v;
    }
    else if (parsedUrl.host.endsWith('youtu.be')) {
        return parsedUrl.path.substring(1);
    }
};
exports.videoId = videoId;
