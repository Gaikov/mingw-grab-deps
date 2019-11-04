/**
 * Created by Roman.Gaikov on 11/4/2019
 */
import {Args} from "./Args";
import {FileUtils} from "./file/FileUtils";
import {FilePath} from "./file/FilePath";

export class Config {
    private readonly _data: any;
    private readonly _args: Args;

    constructor(args: Args) {
        const configPath = args.getArg("--config");
        this._data = {};
        if (configPath) {
            this._data = FileUtils.readJson(new FilePath(configPath)) || {};
        }
        this._args = args;
    }

    getOption(name: string): string {
        return this._args.getArg("--" + name) || this._data[name];
    }
}
