/**
 * Created by Roman.Gaikov on 3/21/2019
 */
import * as fs from "fs-extra";
import {
    copySync,
    removeSync
} from "fs-extra";
import {
    normalize,
    relative,
    dirname
} from "path";
import chalk from "chalk";
import {unlinkSync} from "fs";
import {dirSync} from "tmp";

export class FilePath {

    private _path: string;

    constructor(path: string) {
        this.path = path;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = normalize(value).replace(/\\/g, "/");
    }

    get parent(): FilePath {
        return new FilePath(dirname(this._path));
    }

    get name(): string {
        const parts = this.path.split("/");
        return parts[parts.length - 1];
    }

    get extension(): string {
        const parts = this.name.split(".");
        if (parts.length > 1) {
            return parts[parts.length - 1];
        }
        return null;
    }

    get exists(): boolean {
        return this._path && fs.existsSync(this._path);
    }

    get isFolder(): boolean {
        if (this.exists) {
            const stat = fs.statSync(this._path);
            return stat.isDirectory();
        }
        return false;
    }

    resolvePath(relativePath: string): FilePath {
        return new FilePath(this.path + "/" + relativePath);
    }

    relativePath(file: FilePath): string {
        return relative(this.path, file.path).replace(/\\/g, "/");
    }

    createFolder(): boolean {

        if (this.extension) {
            try {
                fs.ensureFileSync(this.path);
            } catch (e) {
                console.warn("can't create file path: ", this.path);
                return false;
            }
        } else {
            try {
                fs.ensureDirSync(this.path);
            } catch (e) {
                console.warn("can't create folder path: ", this.path);
                return false;
            }
        }

        return true;
    }

    public static createTempFolder(prefix?: string): FilePath {
        const result = dirSync({prefix: prefix, unsafeCleanup: true});
        return new FilePath(result.name);
    }

    public remove(): boolean {
        if (this.isFolder) {
            try {
                removeSync(this.path);
            } catch (e) {
                console.error(null, `Can't remove directory '${chalk.blue(this.path)}'`);
                return false;
            }
        } else {
            try {
                unlinkSync(this.path);
            } catch (e) {
                console.error(null, `Can't remove file '${chalk.blue(this.path)}'`);
            }
        }
        return true;
    }

    public copy(destination: FilePath): boolean {
        console.log(`copy '${this.path}' to '${destination.path}'`);
        try {
            copySync(this.path, destination.path, {overwrite: true});
        } catch (e) {
            console.error(`Can't copy '${this.path}' to '${destination.path}'`);
            return false;
        }

        return true;
    }

    public listing(): FilePath[] {
        if (this.isFolder) {
            const list: FilePath[] = [];
            fs.readdirSync(this.path).forEach(fileName => {
                list.push(this.resolvePath(fileName));
            });
            return list;
        }
        return null;
    }

    public listingDeep(): FilePath[] {
        const list: FilePath[] = this.listing();
        let result = list;

        for (const file of list) {
            if (file.isFolder) {
                result = result.concat(file.listingDeep());
            }
        }
        return result;
    }

}
