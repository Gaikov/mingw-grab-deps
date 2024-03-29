import {FilePath} from "./file/FilePath";
import {DepsGrabber} from "./DepsGrabber";
import {Args} from "./Args";
import {Config} from "./Config";

console.log("Hello from GROm!");
const args = new Args(process.argv);
const config = new Config(args);

const inputBinary = config.getOption("input-binary");
if (!inputBinary) {
    console.error("binary file is not specified!");
    process.exit(-1);
}

const binaryPath = new FilePath(inputBinary);
if (binaryPath.isFolder || !binaryPath.exists) {
    console.error("binary file is invalid!");
    process.exit(-1);
}

const ntldd = config.getOption("ntldd");
if (!ntldd) {
    console.error("ntldd is not specified");
    process.exit(-1);
}

const folderPath = config.getOption("output-folder");
const folder = folderPath ? new FilePath(folderPath) : binaryPath.parent;
if (!folder.createFolder() || !folder.isFolder) {
    console.error("invalid output folder");
    process.exit(-1);
}

const grabber = new DepsGrabber();
const result: string[] = [];
grabber.grab(ntldd, binaryPath.path, result).then(() => {

    for (const filePath of result) {
        const src = new FilePath(filePath);
        const dst = folder.resolvePath(src.name);
        src.copy(dst);
    }

    binaryPath.copy(folder.resolvePath(binaryPath.name));

    console.log("DONE");
});





