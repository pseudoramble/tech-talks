import { spawn, spawnSync } from "child_process";
import { access, readdirSync, readFileSync } from "fs";

import { genUrl, validUrl, validVideoId, videoId } from "./youtubeUrls";

const loadFileTable = (path: string) => {
    const jsonFiles = readdirSync(path).filter((file: string) => file.endsWith('.json'));
    const idFilePairs: string[][] = jsonFiles.map(file => readFileSync(`repo/${file}`, 'utf-8'))
        .map(contents => JSON.parse(contents))
        .map(metadata => [metadata.id, `repo/${metadata.title}.ogg`]);

    return new Map<string, string>(idFilePairs);
};

const extractAudio = (id: string) => new Promise<any>((resolve, reject) => {
    const downloaderProcess = spawn("youtube-dl", ["-x", "--audio-format", "vorbis", "-o", "repo/%(title)s.%(ext)s", "--write-info-json", genUrl(id)]);

    downloaderProcess.stdout.on('data', (data: Buffer) => {
        console.warn(data.toString());
    });

    downloaderProcess.stderr.on('data', (data: Buffer) => {
        console.warn(data.toString());
    });

    downloaderProcess.on('exit', (code: number) => {
        if (code === 0) {
            const filenameTest = spawnSync("youtube-dl", ["--get-filename", genUrl(id)]);
            fileTable.set(id, filenameTest.stdout.toString());
            resolve({ id });
        } else {
            reject(new Error("While downloading & extracting, something bad happened"));
        }
    });
});

const fileTable: Map<String, string> = loadFileTable('./repo/');

export function addTalk(url: string) {
    return new Promise<any>((resolve, reject) => {
        if (validUrl(url) && validVideoId(url)) {
            extractAudio(videoId(url)).then(results => resolve(results));
        } else {
            reject(new Error(`The URL ${url} is not valid for YouTube`));
        }
    });
};

export function getTalk(id: string) {
    return new Promise<any>((resolve, reject) => {
        if (fileTable.has(id)) {
            const file = fileTable.get(id);

            resolve({
                path: file,
                name: file.substring(4)
            });
        } else {
            reject(new Error('Unable to locate video with ID ' + id));
        }
    });
};