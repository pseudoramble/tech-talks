import { parse as jsurl, Url } from "url";

const videoIdRegex = /^[A-Za-z0-9_-]+$/;
const parseUrl = (url: string) => jsurl(url, true);
const validUrl = (url: string) => {
    const parsedUrl = parseUrl(url);
    return parsedUrl.host.endsWith('youtube.com') || parsedUrl.host.endsWith('youtu.be');
}
const validVideoId = (url: string) => {
    const parsedUrl = parseUrl(url);

    if (parsedUrl.host.endsWith('youtube.com')) {
        return parsedUrl.query && parsedUrl.query.v && videoIdRegex.test(parsedUrl.query.v);
    } else if (parsedUrl.host.endsWith('youtu.be')) {
        return parsedUrl.path && videoIdRegex.test(parsedUrl.path.substring(1));
    }
};
const videoId = (url: string) => {
    const parsedUrl = parseUrl(url);

    if (parsedUrl.host.endsWith('youtube.com')) {
        return parsedUrl.query.v;
    } else if (parsedUrl.host.endsWith('youtu.be')) {
        return parsedUrl.path.substring(1);
    }
}
const genUrl = (id: string) => `https\:\/\/www.youtube.com\/watch?v=${id}`;

export { genUrl, videoId, validVideoId, validUrl }
