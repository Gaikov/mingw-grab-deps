# MinGW executable dependency grabber
Checks and grabs executable dependencies to allow executable runs without
mingw environment. To run script you need to install nodejs. The script
uses ntldd to get dependencies recursively. You need to install ntldd 
utility via pacman.
## Command line args
- --input-binary - Path to binary file which dependencies will be grabbed
- --ntldd - Path to ntldd utility
- --output-folder - (optional) Folder where dependencies will be stored.
If it's omitted dependencies will be stored in the binary file's folder
## Usage example
````
node mingw-grab-deps.js --input-binary D:/path/to/your/bin.exe --ntldd C:/msys64/mingw64/bin/ntldd.exe --output-folder d:/path/to/ouput/folder
````
