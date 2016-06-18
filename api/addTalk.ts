import { genUrl, validUrl, validVideoId, videoId } from "./youtubeUrls";
import { spawn } from "child_process";

const extractAudio = (id: string) => new Promise<any>((resolve, reject) => {
    const downloaderProcess = spawn("youtube-dl", ["-x", "-o", "repo/%(title)s.%(ext)s", "--write-info-json", genUrl(id)]);

    downloaderProcess.stdout.on('data', (data: Buffer) => {
        console.warn(data.toString());
    });

    downloaderProcess.stderr.on('data', (data: Buffer) => {
        console.warn(data.toString());
    });

    downloaderProcess.on('exit', (code: number) => {
        console.warn('Done. Code = ', code);

        if (code === 0) {
            resolve({ id });
        } else {
            reject(new Error("While downloading & extracting, something bad happened"));
        }
    });
});

export function addTalk(url: string) {
    return new Promise<any>((resolve, reject) => {
        if (validUrl(url) && validVideoId(url)) {
            extractAudio(videoId(url)).then(results => resolve(results));
        } else {
            reject(new Error(`The URL ${url} is not valid for YouTube`));
        }
    });
};
