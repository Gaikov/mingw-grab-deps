import {Utils} from "./Utils";

export class Grabber {


    async grab(ntldd: string, targetExe: string): Promise<void> {
        const output = await Utils.execute(ntldd + " " + targetExe);
        console.log(output);
    }
}