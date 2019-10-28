import {Utils} from "./Utils";

export class DepsGrabber {

    async grab(ntldd: string, targetFile: string, result: string[]): Promise<void> {

        console.log("checking: ", targetFile);
        const output = await Utils.execute(ntldd + " " + targetFile);

        const reg = /\b[^)]*\)/g;
        const list = output.match(reg);
        const deptList: string[] = [];

        for (const line of list) {
            const filePath = line.match(/(?<==>\s*)[^(]*/)[0].trim();
            if (filePath.indexOf("SYSTEM32") < 0 && result.indexOf(filePath) < 0) {
                console.log("dependency:", filePath);
                deptList.push(filePath);
            }
        }

        for (const filePath of deptList.concat()) {
            await this.grab(ntldd, filePath, result);
        }

        result.push(...deptList);
    }
}