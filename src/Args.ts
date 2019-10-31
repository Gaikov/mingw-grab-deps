/**
 * Created by Roman.Gaikov on 10/29/2019
 */

export class Args {

    private readonly _args: string[];

    constructor(args: string[]) {
        this._args = args.concat();
    }

    hasArgs(name: string): boolean {
        return this._args.indexOf(name) >= 0;
    }

    getArg(name: string): string {
        const index = this._args.indexOf(name);
        if (index >= 0 && index < this._args.length - 1) {
            return this._args[index + 1];
        }
        return null;
    }
}
