/**
 * Created by Roman.Gaikov on 3/21/2019
 */
import {FilePath} from "./FilePath";
import {readJSONSync, writeJSONSync} from "fs-extra";
import {
    readFileSync,
    writeFileSync
} from "fs";

export class FileUtils {

    static readText(file: FilePath): string {
        try {
            return readFileSync(file.path, "utf8");
        } catch (error) {
            console.warn("can't read text: ", file.path)
        }
        return null;
    }

    static writeText(file: FilePath, text: string): boolean {
        try {
            writeFileSync(file.path, text);
            return false;
        } catch (error) {
            console.warn("can't write text: ", file.path);
        }
        return true;
    }

    static readJson(file: FilePath): any {
        console.info("...reading json: ", file.path);
        try {
            return readJSONSync(file.path, {encoding: "utf8"});
        } catch (error) {
            console.warn("can't read json: ", file.path);
        }
        return null;
    }

    static writeJson(file: FilePath, json: any): boolean {
        console.info("...writing json: ", file.path);
        if (!file.createFolder()) {
            return false;
        }

        try {
            writeJSONSync(file.path, json, {encoding: "utf8", spaces: "\t"});
        } catch (error) {
            console.warn("can't write json:", file.path);
            return false;
        }
        return true;
    }
}
