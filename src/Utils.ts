import {exec} from "child_process";

export class Utils {
    static async execute(command: string):Promise<string> {
        return new Promise<string>(resolve => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return null;
                }

                return stdout;
            })
        });
    }
}