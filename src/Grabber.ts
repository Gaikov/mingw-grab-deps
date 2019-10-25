import {Utils} from "./Utils";

export class Grabber {

    async grab(ntldd: string, targetFile: string): Promise<string[]> {

        console.log("checking: ", targetFile);
        const output = await Utils.execute(ntldd + " " + targetFile);

        const reg = /\b[^)]*\)/g;
        const list = output.match(reg);
        let result: string[] = [];

        for (const line of list) {
            const filePath = line.match(/(?<==>\s*)[^(]*/)[0].trim();
            if (filePath.indexOf("SYSTEM32") < 0) {
                console.log("dependency:", filePath);
                result.push(filePath);
            }
        }

        for (const filePath of result.concat()) {
            result = result.concat(await this.grab(ntldd, filePath));
        }

        return result;
    }
}