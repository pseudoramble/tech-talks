import { validUrl, validVideoId, videoId } from "./youtubeUrls";

export function addTalk(url: string) {
    return new Promise<any>((resolve, reject) => {
        if (validUrl(url) && validVideoId(url)) {
            const id = videoId(url);
            resolve({ id: id });
        } else {
            reject(new Error(`The URL ${url} is not valid for YouTube`));
        }
    });
}
