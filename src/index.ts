import {FileUtils} from "./file/FileUtils";
import {FilePath} from "./file/FilePath";
import {DepsGrabber} from "./DepsGrabber";

console.log("Hello from GROm!");

if (process.argv.length < 3) {
    console.error("executable is not specified!");
    process.exit(-1);
}

const targetExe = new FilePath(process.argv[2]);
console.log("processing exec: ", targetExe.path);

const config = FileUtils.readJson(new FilePath(process.cwd() + "/config.json"));
if (!config) {
    process.exit(-1);
}

const ntldd = config["ntldd-exec"];
if (!ntldd) {
    console.error("ntldd is not specified in the config");
    process.exit(-1);
}

const grabber = new DepsGrabber();

const result: string[] = [];
grabber.grab(ntldd, targetExe.path, result).then(()=> {
    console.log(result.length, "dependencies found", result);
    console.log("DONE");
});





