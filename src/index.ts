import {FileUtils} from "./file/FileUtils";
import {FilePath} from "./file/FilePath";

console.log("Hello from GROm!");

if (process.argv.length < 3) {
    console.error("executable is not specified!");
    process.exit(-1);
}

const config = FileUtils.readJson(new FilePath(process.cwd() + "/config.json"));
if (!config) {
    process.exit(-1);
}

const ntldd = config["ntldd-exec"];
if (!ntldd) {
    console.error("ntldd is not specified in the config");
    process.exit(-1);
}



console.log("DONE");


